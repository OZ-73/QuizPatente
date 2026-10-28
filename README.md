# Patente Quiz PWA

Progressive Web App per prepararsi all'esame di teoria della **patente B** (valida anche per A1/A2/A) e per allenare i **riflessi visivi e acustici**.

## Funzionalità

- **Simulazione esame**: 30 domande, 20 minuti, max 3 errori (formato ufficiale)
- **Studio per argomenti**: quiz mirati su singoli temi
- **Test riflessi visivi**: tocca quando lo schermo diventa verde
- **Test riflessi acustici**: tocca quando senti il bip
- **Installabile** come app (PWA) su Android / iOS / desktop
- **Funziona offline** grazie al Service Worker

## Come usarla

### Opzione 1 – Apri direttamente
Apri `index.html` in un browser moderno (Chrome, Edge, Firefox, Safari).

### Opzione 2 – Server locale (consigliato per PWA completa)
```bash
cd patente-pwa
npx serve .
# oppure
python3 -m http.server 8080
```
Poi apri `http://localhost:8080` e usa “Aggiungi a schermata Home” / “Installa app”.

### Opzione 3 – Deploy
Carica la cartella su qualsiasi hosting statico (Netlify, Vercel, GitHub Pages, Firebase Hosting…).

## Note importanti

Le domande sono **educative** e basate sui temi del listato ministeriale A1/B.
Non costituiscono la banca dati ufficiale completa del Ministero delle Infrastrutture e dei Trasporti.
Per l’esame reale consulta sempre il [Portale dell’Automobilista](https://www.ilportaledellautomobilista.it).

I test dei riflessi sono solo a scopo di allenamento e **non sostituiscono** le visite mediche ufficiali.

## Struttura

```
patente-pwa/
├── index.html
├── manifest.json
├── sw.js
├── css/style.css
├── js/
│   ├── app.js
│   └── questions.js
└── icons/
    ├── icon.svg
    ├── icon-192.png
    └── icon-512.png
```

Buona preparazione! 🚗
