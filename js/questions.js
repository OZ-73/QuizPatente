// Domande di pratica basate sui temi ufficiali del listato ministeriale A1/B
// (educative – non copia del database ufficiale completo)
window.QUIZ_DATA = {
  topics: [
    "Segnali di pericolo",
    "Segnali di divieto",
    "Segnali di obbligo",
    "Segnali di precedenza",
    "Segnali di indicazione",
    "Norme di comportamento",
    "Limiti di velocità",
    "Precedenze e incroci",
    "Sorpasso",
    "Parcheggio e fermata",
    "Cinture e dispositivi di sicurezza",
    "Alcol e stupefacenti",
    "Incidenti e soccorso",
    "Documenti e assicurazione",
    "Veicoli e attrezzature",
    "Neopatentati",
    "Ambiente e inquinamento"
  ],
  questions: [
    // Segnali di pericolo
    { id: 1, topic: "Segnali di pericolo", text: "Il segnale di 'curva pericolosa a destra' preannuncia una curva che richiede particolare attenzione.", answer: true, explanation: "I segnali di pericolo avvertono di situazioni potenzialmente pericolose sulla strada." },
    { id: 2, topic: "Segnali di pericolo", text: "Il segnale di passaggio a livello senza barriere impone di fermarsi sempre prima dei binari.", answer: false, explanation: "Si deve rallentare e accertarsi che non arrivino treni; l'obbligo di fermata assoluta vale se ci sono segnalazioni luminose o acustiche attive o se le barriere sono chiuse." },
    { id: 3, topic: "Segnali di pericolo", text: "Il segnale di 'discesa pericolosa' indica una pendenza superiore al 10%.", answer: true, explanation: "Segnala pendenze elevate che richiedono particolare cautela nella frenata e nella marcia." },
    { id: 4, topic: "Segnali di pericolo", text: "Il triangolo con il simbolo di due auto che si urtano preannuncia un tratto con rischio di tamponamento.", answer: true, explanation: "È il segnale di pericolo generico per code o rischio di collisione." },

    // Segnali di divieto
    { id: 5, topic: "Segnali di divieto", text: "Il segnale di divieto di sorpasso vieta di superare i veicoli a motore.", answer: true, explanation: "Il divieto di sorpasso riguarda generalmente i veicoli a motore, con alcune eccezioni." },
    { id: 6, topic: "Segnali di divieto", text: "Il segnale di limite di velocità di 50 km/h è valido solo nei centri abitati.", answer: false, explanation: "Il segnale di limite di velocità vale fino al successivo segnale di fine limitazione o a un nuovo limite." },
    { id: 7, topic: "Segnali di divieto", text: "Il divieto di transito ai veicoli a motore a due ruote riguarda anche i ciclomotori.", answer: true, explanation: "Il segnale vieta il transito a motocicli e ciclomotori." },
    { id: 8, topic: "Segnali di divieto", text: "Il segnale di divieto di sosta vieta sia la sosta sia la fermata.", answer: false, explanation: "Il divieto di sosta consente la fermata (breve interruzione della marcia)." },

    // Segnali di obbligo
    { id: 9, topic: "Segnali di obbligo", text: "Il segnale di direzione obbligatoria a destra impone di svoltare a destra al prossimo incrocio.", answer: true, explanation: "I segnali di obbligo devono essere rispettati." },
    { id: 10, topic: "Segnali di obbligo", text: "Il segnale di percorso pedonale obbliga i pedoni a utilizzarlo e vieta il transito dei veicoli.", answer: true, explanation: "È un percorso riservato ai pedoni." },

    // Precedenze
    { id: 11, topic: "Segnali di precedenza", text: "Il segnale di 'dare precedenza' impone di fermarsi sempre.", answer: false, explanation: "Si deve dare la precedenza ai veicoli che circolano sulla strada principale, fermandosi solo se necessario." },
    { id: 12, topic: "Segnali di precedenza", text: "Il segnale di 'STOP' impone di fermarsi in ogni caso e dare la precedenza.", answer: true, explanation: "Lo STOP richiede la fermata assoluta prima di impegnare l'incrocio." },
    { id: 13, topic: "Precedenze e incroci", text: "Negli incroci non regolati da segnaletica, si applica la regola della precedenza a destra.", answer: true, explanation: "È la regola generale in assenza di segnali o agenti." },
    { id: 14, topic: "Precedenze e incroci", text: "Chi proviene da una strada privata ha sempre la precedenza.", answer: false, explanation: "Chi esce da luogo privato deve dare la precedenza a chi circola sulla strada pubblica." },

    // Limiti di velocità
    { id: 15, topic: "Limiti di velocità", text: "Il limite di velocità nei centri abitati è di 50 km/h, salvo diversa segnalazione.", answer: true, explanation: "È il limite generale nei centri abitati." },
    { id: 16, topic: "Limiti di velocità", text: "Sulle autostrade il limite massimo per le autovetture è di 130 km/h in condizioni normali.", answer: true, explanation: "Può essere ridotto in caso di pioggia o per specifiche tratte." },
    { id: 17, topic: "Limiti di velocità", text: "I neopatentati nei primi tre anni devono rispettare limiti di velocità ridotti.", answer: true, explanation: "Sulle autostrade 100 km/h e sulle extraurbane principali 90 km/h." },
    { id: 18, topic: "Limiti di velocità", text: "In caso di nebbia con scarsa visibilità è obbligatorio non superare i 50 km/h.", answer: true, explanation: "La velocità deve essere adeguata alle condizioni di visibilità." },

    // Comportamento e sicurezza
    { id: 19, topic: "Norme di comportamento", text: "Il conducente deve mantenere sempre la destra della carreggiata.", answer: true, explanation: "Salvo quando è necessario per sorpassare o evitare ostacoli." },
    { id: 20, topic: "Norme di comportamento", text: "È consentito usare il telefono cellulare tenendolo in mano durante la guida.", answer: false, explanation: "È vietato; è ammesso solo con vivavoce o auricolare." },
    { id: 21, topic: "Cinture e dispositivi di sicurezza", text: "Le cinture di sicurezza devono essere indossate anche nei posti posteriori.", answer: true, explanation: "Obbligatorie per tutti i passeggeri, anteriori e posteriori." },
    { id: 22, topic: "Cinture e dispositivi di sicurezza", text: "I bambini di altezza inferiore a 150 cm devono usare sistemi di ritenuta omologati.", answer: true, explanation: "Obbligatorio fino a 150 cm di altezza." },
    { id: 23, topic: "Alcol e stupefacenti", text: "Il tasso alcolemico massimo consentito per i neopatentati è 0,0 g/l.", answer: true, explanation: "Per i neopatentati e i conducenti professionali vige il limite zero." },
    { id: 24, topic: "Alcol e stupefacenti", text: "Guidare sotto l'effetto di stupefacenti è sempre vietato.", answer: true, explanation: "È un reato grave e comporta sanzioni severe." },

    // Sorpasso
    { id: 25, topic: "Sorpasso", text: "Prima di sorpassare è obbligatorio azionare l'indicatore di direzione.", answer: true, explanation: "È obbligatorio segnalare ogni manovra di sorpasso." },
    { id: 26, topic: "Sorpasso", text: "È vietato il sorpasso in prossimità o in corrispondenza delle intersezioni.", answer: true, explanation: "Salvo casi particolari regolati da segnaletica." },
    { id: 27, topic: "Sorpasso", text: "Il sorpasso a destra è sempre consentito.", answer: false, explanation: "Di regola il sorpasso si effettua a sinistra; a destra solo in casi specifici (es. veicoli che svoltano a sinistra)." },

    // Parcheggio
    { id: 28, topic: "Parcheggio e fermata", text: "La fermata è consentita anche dove è vietata la sosta, purché breve.", answer: true, explanation: "La fermata è l'interruzione temporanea della marcia." },
    { id: 29, topic: "Parcheggio e fermata", text: "È vietato sostare in corrispondenza di un passaggio pedonale.", answer: true, explanation: "Ostacola i pedoni e crea pericolo." },
    { id: 30, topic: "Parcheggio e fermata", text: "Sulle strade extraurbane è consentito sostare sulla corsia di marcia.", answer: false, explanation: "Si deve utilizzare la banchina o aree di sosta, se disponibili." },

    // Incidenti
    { id: 31, topic: "Incidenti e soccorso", text: "In caso di incidente con feriti è obbligatorio prestare soccorso e chiamare i soccorsi.", answer: true, explanation: "L'omissione di soccorso è un reato." },
    { id: 32, topic: "Incidenti e soccorso", text: "Il modulo blu (CID) può essere utilizzato per la constatazione amichevole di incidente.", answer: true, explanation: "Facilita la denuncia all'assicurazione." },
    { id: 33, topic: "Incidenti e soccorso", text: "Dopo un incidente si devono sempre spostare i veicoli dalla carreggiata.", answer: false, explanation: "Solo se non ci sono feriti gravi e non si alterano le tracce utili agli accertamenti." },

    // Documenti
    { id: 34, topic: "Documenti e assicurazione", text: "Durante la guida è obbligatorio avere con sé la patente e il certificato di proprietà o foglio complementare.", answer: true, explanation: "Documenti obbligatori a bordo." },
    { id: 35, topic: "Documenti e assicurazione", text: "L'assicurazione RCA è obbligatoria per circolare su strada pubblica.", answer: true, explanation: "Copre la responsabilità civile verso terzi." },
    { id: 36, topic: "Documenti e assicurazione", text: "Il tagliando assicurativo deve essere esposto sul parabrezza.", answer: false, explanation: "Dal 2015 non è più obbligatorio esporre il tagliando; i controlli sono telematici." },

    // Veicoli
    { id: 37, topic: "Veicoli e attrezzature", text: "I fari anabbaglianti devono essere usati di notte e in caso di scarsa visibilità.", answer: true, explanation: "Obbligatori in queste condizioni." },
    { id: 38, topic: "Veicoli e attrezzature", text: "Il gilet ad alta visibilità deve essere indossato in caso di fermata di emergenza fuori dai centri abitati.", answer: true, explanation: "Obbligatorio per chi scende dal veicolo in queste circostanze." },
    { id: 39, topic: "Veicoli e attrezzature", text: "Il triangolo di emergenza deve essere posizionato ad almeno 50 metri dal veicolo fermo.", answer: true, explanation: "Per dare adeguato preavviso agli altri utenti." },

    // Neopatentati
    { id: 40, topic: "Neopatentati", text: "I neopatentati non possono guidare veicoli con potenza superiore a 70 kW nei primi anni.", answer: true, explanation: "Limitazioni di potenza e rapporto potenza/peso per i primi 12 mesi (con alcune eccezioni)." },
    { id: 41, topic: "Neopatentati", text: "Per i neopatentati il limite di alcolemia è lo stesso degli altri conducenti (0,5 g/l).", answer: false, explanation: "Per i neopatentati è 0,0 g/l." },

    // Ambiente
    { id: 42, topic: "Ambiente e inquinamento", text: "È vietato lasciare il motore acceso a veicolo fermo per periodi prolungati.", answer: true, explanation: "Per ridurre le emissioni inquinanti." },
    { id: 43, topic: "Ambiente e inquinamento", text: "Il fumo di scarico di colore scuro indica generalmente una combustione irregolare e maggiore inquinamento.", answer: true, explanation: "Può indicare problemi al motore o al sistema di scarico." },

    // Altre
    { id: 44, topic: "Norme di comportamento", text: "In autostrada è obbligatorio mantenere una distanza di sicurezza di almeno 100 metri.", answer: false, explanation: "La distanza deve essere adeguata alla velocità e alle condizioni; non esiste un minimo fisso di 100 m in tutte le situazioni." },
    { id: 45, topic: "Segnali di indicazione", text: "Il segnale di preavviso di uscita autostradale indica la distanza dall'uscita.", answer: true, explanation: "Aiuta a prepararsi per uscire correttamente." },
    { id: 46, topic: "Precedenze e incroci", text: "Ai semafori, la luce gialla indica di accelerare per passare prima del rosso.", answer: false, explanation: "La luce gialla impone di fermarsi se è possibile farlo in sicurezza." },
    { id: 47, topic: "Sorpasso", text: "È vietato sorpassare un veicolo che sta a sua volta sorpassando.", answer: true, explanation: "Il doppio sorpasso è generalmente vietato." },
    { id: 48, topic: "Limiti di velocità", text: "Sulle strade extraurbane secondarie il limite generale è di 90 km/h.", answer: true, explanation: "Salvo diversa segnalazione." },
    { id: 49, topic: "Cinture e dispositivi di sicurezza", text: "Il casco è obbligatorio per i conducenti di ciclomotori e motocicli.", answer: true, explanation: "Obbligatorio e deve essere omologato." },
    { id: 50, topic: "Incidenti e soccorso", text: "In caso di incidente senza feriti, i veicoli devono essere spostati dalla carreggiata se possibile.", answer: true, explanation: "Per non ostacolare il traffico, dopo aver documentato la posizione se necessario." },
    { id: 51, topic: "Norme di comportamento", text: "È consentito superare i limiti di velocità per agevolare un sorpasso.", answer: false, explanation: "I limiti di velocità devono essere sempre rispettati." },
    { id: 52, topic: "Segnali di divieto", text: "Il segnale di divieto di accesso vieta l'ingresso in entrambe le direzioni.", answer: false, explanation: "Il divieto di accesso (cerchio rosso con barra) vieta l'ingresso nella direzione indicata." },
    { id: 53, topic: "Veicoli e attrezzature", text: "I dispositivi di illuminazione devono essere sempre efficienti e puliti.", answer: true, explanation: "Garantiscono visibilità e sicurezza." },
    { id: 54, topic: "Alcol e stupefacenti", text: "Anche piccole quantità di alcol possono ridurre i riflessi e aumentare i tempi di reazione.", answer: true, explanation: "L'alcol compromette le capacità di guida già a bassi livelli." },
    { id: 55, topic: "Parcheggio e fermata", text: "È vietato sostare sulle piste ciclabili.", answer: true, explanation: "Ostacola i ciclisti e crea pericolo." },
    { id: 56, topic: "Segnali di pericolo", text: "Il segnale di 'animale selvatico' invita a moderare la velocità per il rischio di attraversamento di animali.", answer: true, explanation: "È un segnale di pericolo." },
    { id: 57, topic: "Documenti e assicurazione", text: "La revisione del veicolo deve essere effettuata entro i termini previsti dalla legge.", answer: true, explanation: "Obbligatoria per circolare." },
    { id: 58, topic: "Neopatentati", text: "I neopatentati possono trasportare passeggeri senza limitazioni fin dal primo giorno.", answer: false, explanation: "Esistono limitazioni nei primi mesi in alcune regioni o per determinate categorie, ma la regola principale riguarda potenza e alcol." },
    { id: 59, topic: "Ambiente e inquinamento", text: "Utilizzare pneumatici in buono stato riduce i consumi e le emissioni.", answer: true, explanation: "Pneumatici sottogonfiati aumentano i consumi." },
    { id: 60, topic: "Norme di comportamento", text: "Il conducente deve prestare attenzione anche agli utenti deboli della strada (pedoni, ciclisti).", answer: true, explanation: "Particolare tutela è dovuta agli utenti vulnerabili." }
  ]
};
