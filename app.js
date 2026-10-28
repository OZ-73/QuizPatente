// ===== Patente Quiz PWA =====
const App = {
  state: {
    screen: 'home',
    quiz: null,
    currentQ: 0,
    answers: [],
    timer: null,
    timeLeft: 20 * 60,
    selectedTopic: null,
    reflex: {
      mode: null, // 'visual' | 'acoustic'
      trials: [],
      waiting: false,
      startTime: 0,
      timeoutId: null
    }
  },

  init() {
    this.bindNav();
    this.render();
    this.registerSW();
    this.setupInstall();
  },

  // Navigation – event delegation (funziona anche con elementi ricreati)
  bindNav() {
    document.addEventListener('click', (e) => {
      const el = e.target.closest('[data-nav]');
      if (!el) return;
      e.preventDefault();
      const screen = el.dataset.nav;
      if (screen) this.navigate(screen);
    });
  },

  navigate(screen, params = {}) {
    // Cleanup timers
    if (this.state.timer) {
      clearInterval(this.state.timer);
      this.state.timer = null;
    }
    if (this.state.reflex.timeoutId) {
      clearTimeout(this.state.reflex.timeoutId);
      this.state.reflex.timeoutId = null;
    }

    this.state.screen = screen;
    Object.assign(this.state, params);
    this.render();
    window.scrollTo(0, 0);
  },

  // Screens
  render() {
    const main = document.getElementById('main');
    const headerTitle = document.getElementById('header-title');
    const backBtn = document.getElementById('back-btn');

    // Update nav active
    document.querySelectorAll('.nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.nav === this.state.screen ||
        (this.state.screen.startsWith('quiz') && el.dataset.nav === 'quiz') ||
        (this.state.screen.startsWith('reflex') && el.dataset.nav === 'reflex') ||
        (this.state.screen === 'topics' && el.dataset.nav === 'study'));
    });

    backBtn.classList.toggle('hidden', this.state.screen === 'home');
    backBtn.onclick = () => this.navigate('home');

    const screens = {
      home: () => this.renderHome(),
      quiz: () => this.renderQuizSetup(),
      'quiz-run': () => this.renderQuizRun(),
      'quiz-result': () => this.renderQuizResult(),
      study: () => this.renderTopics(),
      'study-topic': () => this.renderTopicQuiz(),
      reflex: () => this.renderReflexMenu(),
      'reflex-test': () => this.renderReflexTest(),
      info: () => this.renderInfo()
    };

    const titles = {
      home: 'Patente Quiz',
      quiz: 'Simulazione Esame',
      'quiz-run': 'Esame in corso',
      'quiz-result': 'Risultato',
      study: 'Studio per argomenti',
      'study-topic': this.state.selectedTopic || 'Argomento',
      reflex: 'Test Riflessi',
      'reflex-test': this.state.reflex.mode === 'visual' ? 'Riflessi Visivi' : 'Riflessi Acustici',
      info: 'Info & Requisiti'
    };

    headerTitle.textContent = titles[this.state.screen] || 'Patente Quiz';
    main.innerHTML = screens[this.state.screen] ? screens[this.state.screen]() : '';
    this.bindScreenEvents();
  },

  renderHome() {
    return `
      <div class="screen">
        <div class="info-box">
          📚 Domande di pratica basate sui temi ufficiali del listato ministeriale A1/B 2026.
          Formato esame: 30 domande · 20 minuti · max 3 errori.
        </div>
        <div class="home-grid">
          <div class="menu-card" data-nav="quiz">
            <div class="menu-icon blue">📝</div>
            <div class="menu-text">
              <h3>Simulazione Esame</h3>
              <p>30 domande · 20 min · max 3 errori</p>
            </div>
          </div>
          <div class="menu-card" data-nav="study">
            <div class="menu-icon green">📖</div>
            <div class="menu-text">
              <h3>Studio per argomenti</h3>
              <p>${window.QUIZ_DATA.topics.length} argomenti · quiz mirati</p>
            </div>
          </div>
          <div class="menu-card" data-nav="reflex">
            <div class="menu-icon orange">⚡</div>
            <div class="menu-text">
              <h3>Test Riflessi</h3>
              <p>Visivi e acustici · tempi di reazione</p>
            </div>
          </div>
          <div class="menu-card" data-nav="info">
            <div class="menu-icon purple">ℹ️</div>
            <div class="menu-text">
              <h3>Info & Requisiti</h3>
              <p>Esame, vista, udito e consigli</p>
            </div>
          </div>
        </div>
        <p class="disclaimer">
          App educativa indipendente. Le domande sono ispirate ai temi ufficiali ma non costituiscono il database ministeriale completo.
          Per l'esame ufficiale consulta il Portale dell'Automobilista.
        </p>
      </div>
    `;
  },

  renderQuizSetup() {
    return `
      <div class="screen">
        <div class="card">
          <div class="card-title">📝 Simulazione Esame di Teoria</div>
          <p class="card-desc">
            Formato ufficiale: <strong>30 domande</strong> vero/falso,
            <strong>20 minuti</strong> di tempo,
            massimo <strong>3 errori</strong> per essere promossi.
          </p>
          <ul style="font-size:0.9rem;color:var(--text-muted);padding-left:1.2rem;margin-bottom:1.25rem;">
            <li>Domande estratte casualmente dal database di pratica</li>
            <li>Timer attivo come all'esame</li>
            <li>Feedback immediato a fine prova</li>
          </ul>
          <button class="btn btn-primary btn-lg" id="start-exam">Inizia simulazione</button>
        </div>
      </div>
    `;
  },

  startExam() {
    const all = [...window.QUIZ_DATA.questions];
    // Shuffle and take 30
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }
    const selected = all.slice(0, Math.min(30, all.length));

    this.state.quiz = selected;
    this.state.currentQ = 0;
    this.state.answers = new Array(selected.length).fill(null);
    this.state.timeLeft = 20 * 60;
    this.navigate('quiz-run');
    this.startTimer();
  },

  startTimer() {
    this.state.timer = setInterval(() => {
      this.state.timeLeft--;
      const el = document.getElementById('timer');
      if (el) {
        const m = Math.floor(this.state.timeLeft / 60);
        const s = this.state.timeLeft % 60;
        el.textContent = `${m}:${s.toString().padStart(2, '0')}`;
        if (this.state.timeLeft <= 60) el.classList.add('warning');
      }
      if (this.state.timeLeft <= 0) {
        clearInterval(this.state.timer);
        this.finishQuiz();
      }
    }, 1000);
  },

  renderQuizRun() {
    const q = this.state.quiz[this.state.currentQ];
    const progress = ((this.state.currentQ) / this.state.quiz.length) * 100;
    const answered = this.state.answers.filter(a => a !== null).length;
    const m = Math.floor(this.state.timeLeft / 60);
    const s = this.state.timeLeft % 60;

    return `
      <div class="screen">
        <div class="quiz-header">
          <div class="quiz-progress">
            <div class="quiz-progress-bar" style="width:${progress}%"></div>
          </div>
          <div class="quiz-meta">
            <span>${this.state.currentQ + 1}/${this.state.quiz.length}</span>
            <span class="timer ${this.state.timeLeft <= 60 ? 'warning' : ''}" id="timer">${m}:${s.toString().padStart(2, '0')}</span>
          </div>
        </div>

        <div class="question-card">
          <div class="question-number">${q.topic}</div>
          <div class="question-text">${q.text}</div>
          <div class="answer-btns">
            <button class="answer-btn vero" data-answer="true">VERO</button>
            <button class="answer-btn falso" data-answer="false">FALSO</button>
          </div>
          <div class="feedback" id="feedback"></div>
        </div>

        <div class="btn-group">
          <button class="btn btn-outline" id="prev-q" ${this.state.currentQ === 0 ? 'disabled' : ''}>← Precedente</button>
          <button class="btn btn-primary" id="next-q">${this.state.currentQ === this.state.quiz.length - 1 ? 'Termina' : 'Successiva →'}</button>
        </div>
        <p class="text-center mt-1" style="font-size:0.8rem;color:var(--text-muted)">
          Risposte date: ${answered}/${this.state.quiz.length}
        </p>
      </div>
    `;
  },

  answerQuestion(value) {
    const q = this.state.quiz[this.state.currentQ];
    this.state.answers[this.state.currentQ] = value === true || value === 'true';

    // Visual feedback
    const btns = document.querySelectorAll('.answer-btn');
    btns.forEach(b => {
      b.disabled = true;
      const isVero = b.dataset.answer === 'true';
      const correct = q.answer === true;
      if ((isVero && correct) || (!isVero && !correct)) {
        b.classList.add('selected-correct');
      } else if ((isVero && this.state.answers[this.state.currentQ]) || (!isVero && !this.state.answers[this.state.currentQ])) {
        b.classList.add('selected-wrong');
      }
    });

    const fb = document.getElementById('feedback');
    const isCorrect = this.state.answers[this.state.currentQ] === q.answer;
    fb.className = 'feedback show ' + (isCorrect ? 'correct' : 'wrong');
    fb.innerHTML = (isCorrect ? '✓ Corretto! ' : '✗ Sbagliato. ') + (q.explanation || '');
  },

  nextQuestion() {
    if (this.state.currentQ === this.state.quiz.length - 1) {
      this.finishQuiz();
    } else {
      this.state.currentQ++;
      this.render();
    }
  },

  prevQuestion() {
    if (this.state.currentQ > 0) {
      this.state.currentQ--;
      this.render();
    }
  },

  finishQuiz() {
    if (this.state.timer) {
      clearInterval(this.state.timer);
      this.state.timer = null;
    }
    this.navigate('quiz-result');
  },

  renderQuizResult() {
    let correct = 0;
    this.state.quiz.forEach((q, i) => {
      if (this.state.answers[i] === q.answer) correct++;
    });
    const errors = this.state.quiz.length - correct;
    const passed = errors <= 3;
    const pct = Math.round((correct / this.state.quiz.length) * 100);

    let details = '';
    this.state.quiz.forEach((q, i) => {
      const userAns = this.state.answers[i];
      const isCorrect = userAns === q.answer;
      if (!isCorrect) {
        details += `
          <div style="padding:0.75rem 0;border-bottom:1px solid var(--border);font-size:0.9rem;">
            <strong>Q${i + 1}:</strong> ${q.text}<br>
            <span style="color:var(--danger)">Tua risposta: ${userAns === null ? 'Non data' : (userAns ? 'Vero' : 'Falso')}</span> ·
            <span style="color:var(--success)">Corretta: ${q.answer ? 'Vero' : 'Falso'}</span>
            ${q.explanation ? `<br><em style="color:var(--text-muted)">${q.explanation}</em>` : ''}
          </div>
        `;
      }
    });

    return `
      <div class="screen">
        <div class="card">
          <div class="results-score">
            <div class="big" style="color:${passed ? 'var(--success)' : 'var(--danger)'}">${correct}/${this.state.quiz.length}</div>
            <div class="label">${pct}% di risposte corrette</div>
            <div class="badge ${passed ? 'pass' : 'fail'}">
              ${passed ? '✓ PROMOSSO' : '✗ BOCCIATO'}
            </div>
            <p style="margin-top:0.75rem;font-size:0.9rem;color:var(--text-muted)">
              Errori: ${errors} (massimo consentito: 3)
            </p>
          </div>
        </div>

        ${details ? `
          <div class="card">
            <div class="card-title">Errori da ripassare</div>
            ${details}
          </div>
        ` : `
          <div class="card text-center">
            <p style="color:var(--success);font-weight:600;">🎉 Nessun errore! Ottimo lavoro.</p>
          </div>
        `}

        <button class="btn btn-primary mt-2" data-nav="quiz">Nuova simulazione</button>
        <button class="btn btn-outline mt-1" data-nav="home">Torna alla home</button>
      </div>
    `;
  },

  // Study by topic
  renderTopics() {
    const counts = {};
    window.QUIZ_DATA.questions.forEach(q => {
      counts[q.topic] = (counts[q.topic] || 0) + 1;
    });

    const items = window.QUIZ_DATA.topics.map(t => `
      <div class="topic-item" data-topic="${t}">
        <span>${t}</span>
        <span class="topic-count">${counts[t] || 0}</span>
      </div>
    `).join('');

    return `
      <div class="screen">
        <p class="card-desc mb-2">Scegli un argomento e allenati solo su quelle domande.</p>
        <div class="topic-list">${items}</div>
      </div>
    `;
  },

  startTopic(topic) {
    const qs = window.QUIZ_DATA.questions.filter(q => q.topic === topic);
    if (qs.length === 0) return;
    // Shuffle
    for (let i = qs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [qs[i], qs[j]] = [qs[j], qs[i]];
    }
    this.state.quiz = qs;
    this.state.currentQ = 0;
    this.state.answers = new Array(qs.length).fill(null);
    this.state.selectedTopic = topic;
    this.state.timeLeft = 99999; // no real timer for study
    this.navigate('study-topic');
  },

  renderTopicQuiz() {
    // Reuse similar to quiz-run but without strict timer
    const q = this.state.quiz[this.state.currentQ];
    const progress = ((this.state.currentQ) / this.state.quiz.length) * 100;

    return `
      <div class="screen">
        <div class="quiz-header">
          <div class="quiz-progress">
            <div class="quiz-progress-bar" style="width:${progress}%"></div>
          </div>
          <div class="quiz-meta">
            <span>${this.state.currentQ + 1}/${this.state.quiz.length}</span>
          </div>
        </div>

        <div class="question-card">
          <div class="question-number">${q.topic}</div>
          <div class="question-text">${q.text}</div>
          <div class="answer-btns">
            <button class="answer-btn vero" data-answer="true">VERO</button>
            <button class="answer-btn falso" data-answer="false">FALSO</button>
          </div>
          <div class="feedback" id="feedback"></div>
        </div>

        <div class="btn-group">
          <button class="btn btn-outline" id="prev-q" ${this.state.currentQ === 0 ? 'disabled' : ''}>← Precedente</button>
          <button class="btn btn-primary" id="next-q">${this.state.currentQ === this.state.quiz.length - 1 ? 'Fine' : 'Successiva →'}</button>
        </div>
      </div>
    `;
  },

  // Reflex tests
  renderReflexMenu() {
    return `
      <div class="screen">
        <div class="info-box">
          I test dei tempi di reazione (visivi e acustici) sono usati nelle visite mediche,
          soprattutto per le patenti del gruppo 2 (C, D, ecc.). Qui puoi allenarti in modo ludico.
        </div>

        <div class="home-grid">
          <div class="menu-card" id="start-visual">
            <div class="menu-icon teal">👁️</div>
            <div class="menu-text">
              <h3>Riflessi Visivi</h3>
              <p>Tocca quando lo schermo diventa verde</p>
            </div>
          </div>
          <div class="menu-card" id="start-acoustic">
            <div class="menu-icon orange">🔊</div>
            <div class="menu-text">
              <h3>Riflessi Acustici</h3>
              <p>Tocca quando senti il bip</p>
            </div>
          </div>
        </div>

        <div class="card mt-2">
          <div class="card-title">Come funziona</div>
          <p style="font-size:0.9rem;color:var(--text-muted)">
            Ogni prova misura il tempo tra lo stimolo e la tua reazione in millisecondi.
            Fai più prove consecutive per vedere media, minimo e massimo.
            Un tempo tipico di reazione semplice è intorno a 200-300 ms.
          </p>
        </div>
      </div>
    `;
  },

  startReflex(mode) {
    this.state.reflex = {
      mode,
      trials: [],
      waiting: false,
      startTime: 0,
      timeoutId: null,
      phase: 'idle' // idle | wait | ready | result | tooSoon
    };
    this.navigate('reflex-test');
  },

  renderReflexTest() {
    const r = this.state.reflex;
    const stats = this.computeReflexStats();

    let areaContent = '';
    if (r.phase === 'idle') {
      areaContent = `<div class="reflex-instruction">Tocca lo schermo per iniziare la prova</div>`;
    } else if (r.phase === 'wait') {
      areaContent = `<div class="reflex-instruction">${r.mode === 'visual' ? 'Attendi il verde...' : 'Attendi il suono...'}</div>`;
    } else if (r.phase === 'ready') {
      areaContent = `<div class="reflex-instruction">ADESSO!</div>`;
    } else if (r.phase === 'tooSoon') {
      areaContent = `<div class="reflex-instruction">Troppo presto!<br><small>Tocca per riprovare</small></div>`;
    } else if (r.phase === 'result') {
      const last = r.trials[r.trials.length - 1];
      areaContent = `
        <div class="reflex-instruction">
          Tempo di reazione
          <div class="reflex-result">${last} ms</div>
          <small>Tocca per la prossima prova</small>
        </div>
      `;
    }

    const areaClass = r.phase === 'ready' ? 'ready' :
                      r.phase === 'tooSoon' ? 'too-soon' :
                      r.phase === 'wait' ? (r.mode === 'acoustic' ? 'acoustic waiting' : 'waiting') : '';

    return `
      <div class="screen">
        <div class="reflex-area ${areaClass}" id="reflex-area">
          ${areaContent}
        </div>

        <div class="reflex-stats">
          <div class="stat-box">
            <div class="value">${stats.count}</div>
            <div class="label">Prove</div>
          </div>
          <div class="stat-box">
            <div class="value">${stats.avg || '—'}</div>
            <div class="label">Media (ms)</div>
          </div>
          <div class="stat-box">
            <div class="value">${stats.best || '—'}</div>
            <div class="label">Migliore</div>
          </div>
        </div>

        <button class="btn btn-outline mt-2" data-nav="reflex">Cambia modalità</button>
        ${r.trials.length > 0 ? `<button class="btn btn-outline mt-1" id="reset-reflex">Azzera risultati</button>` : ''}
      </div>
    `;
  },

  computeReflexStats() {
    const t = this.state.reflex.trials;
    if (t.length === 0) return { count: 0, avg: null, best: null };
    const avg = Math.round(t.reduce((a, b) => a + b, 0) / t.length);
    const best = Math.min(...t);
    return { count: t.length, avg, best };
  },

  handleReflexTap() {
    const r = this.state.reflex;

    if (r.phase === 'idle' || r.phase === 'result' || r.phase === 'tooSoon') {
      // Start waiting
      r.phase = 'wait';
      this.render();
      const delay = 1500 + Math.random() * 3500; // 1.5 - 5s

      r.timeoutId = setTimeout(() => {
        r.phase = 'ready';
        r.startTime = performance.now();
        this.render();

        if (r.mode === 'acoustic') {
          this.playBeep();
        }
      }, delay);
    } else if (r.phase === 'wait') {
      // Too soon
      clearTimeout(r.timeoutId);
      r.phase = 'tooSoon';
      this.render();
    } else if (r.phase === 'ready') {
      const rt = Math.round(performance.now() - r.startTime);
      r.trials.push(rt);
      r.phase = 'result';
      this.render();
    }
  },

  playBeep() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 880;
      gain.gain.value = 0.3;
      osc.start();
      setTimeout(() => {
        osc.stop();
        ctx.close();
      }, 150);
    } catch (e) {
      console.warn('Audio not available', e);
    }
  },

  // Info
  renderInfo() {
    return `
      <div class="screen">
        <div class="card">
          <div class="card-title">📋 Esame di teoria (Patente B)</div>
          <ul style="font-size:0.9rem;padding-left:1.2rem;color:var(--text-muted);">
            <li><strong>30 domande</strong> vero/falso</li>
            <li><strong>20 minuti</strong> di tempo</li>
            <li><strong>Massimo 3 errori</strong> per essere promossi</li>
            <li>Valido anche per A1, A2, A, B1, BE</li>
            <li>Listato ufficiale dal Portale dell'Automobilista</li>
          </ul>
        </div>

        <div class="card">
          <div class="card-title">👁️ Requisiti visivi (Gruppo 1 – A/B)</div>
          <ul style="font-size:0.9rem;padding-left:1.2rem;color:var(--text-muted);">
            <li>Acuità binoculare ≥ 0,5 (5/10) con correzione</li>
            <li>Occhio peggiore ≥ 0,2 (2/10)</li>
            <li>Campo visivo orizzontale ≥ 120°</li>
            <li>Assenza di diplopia invalidante</li>
          </ul>
        </div>

        <div class="card">
          <div class="card-title">👂 Requisiti uditivi (Gruppo 1 – A/B)</div>
          <ul style="font-size:0.9rem;padding-left:1.2rem;color:var(--text-muted);">
            <li>Percepire la voce conversata a ≥ 2 metri da ciascun orecchio</li>
            <li>Consentiti apparecchi acustici (codice 02 in patente)</li>
          </ul>
        </div>

        <div class="card">
          <div class="card-title">⚡ Tempi di reazione</div>
          <p style="font-size:0.9rem;color:var(--text-muted);">
            Per le patenti del gruppo 2 (C, D, ecc.) sono richiesti tempi di reazione
            a stimoli luminosi e acustici sufficientemente rapidi (almeno 4° decile).
            I test di questa app sono solo a scopo di allenamento e non sostituiscono
            le prove mediche ufficiali.
          </p>
        </div>

        <div class="card">
          <div class="card-title">🔗 Fonti utili</div>
          <p style="font-size:0.9rem;color:var(--text-muted);">
            Portale dell'Automobilista · Ministero delle Infrastrutture e dei Trasporti<br>
            Codice della Strada (D.Lgs. 285/1992) e regolamento di esecuzione.
          </p>
        </div>

        <p class="disclaimer">
          Questa PWA è un progetto educativo indipendente.
          Non è affiliata al Ministero né alla Motorizzazione Civile.
        </p>
      </div>
    `;
  },

  // Event binding after render
  bindScreenEvents() {
    // Home / nav already bound globally via data-nav

    // Start exam
    const startExam = document.getElementById('start-exam');
    if (startExam) startExam.onclick = () => this.startExam();

    // Answer buttons
    document.querySelectorAll('.answer-btn').forEach(btn => {
      btn.onclick = () => {
        if (btn.disabled) return;
        this.answerQuestion(btn.dataset.answer === 'true');
      };
    });

    // Next / Prev
    const next = document.getElementById('next-q');
    if (next) next.onclick = () => this.nextQuestion();
    const prev = document.getElementById('prev-q');
    if (prev) prev.onclick = () => this.prevQuestion();

    // Topics
    document.querySelectorAll('[data-topic]').forEach(el => {
      el.onclick = () => this.startTopic(el.dataset.topic);
    });

    // Reflex menu
    const sv = document.getElementById('start-visual');
    if (sv) sv.onclick = () => this.startReflex('visual');
    const sa = document.getElementById('start-acoustic');
    if (sa) sa.onclick = () => this.startReflex('acoustic');

    // Reflex area
    const area = document.getElementById('reflex-area');
    if (area) area.onclick = () => this.handleReflexTap();

    const reset = document.getElementById('reset-reflex');
    if (reset) reset.onclick = () => {
      this.state.reflex.trials = [];
      this.state.reflex.phase = 'idle';
      this.render();
    };
  },

  // PWA
  registerSW() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    }
  },

  setupInstall() {
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      const banner = document.getElementById('install-banner');
      if (banner) banner.classList.remove('hidden');
    });

    const installBtn = document.getElementById('install-btn');
    if (installBtn) {
      installBtn.onclick = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        await deferredPrompt.userChoice;
        deferredPrompt = null;
        document.getElementById('install-banner')?.classList.add('hidden');
      };
    }
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
