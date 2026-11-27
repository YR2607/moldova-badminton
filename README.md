# Moldavian Badminton Federation

Site oficial: temă deschisă instituțională. Limba implicită — română, comutator RU în header.

## Stack

- Vite + React + TypeScript + React Router
- Design tokens in CSS variables (`src/index.css`)
- i18n: `src/i18n/messages.ts` (RO default)
- Conținut dinamic: `data/site.json` + `data/uploads` (editat din admin)
- Producție: Node server (`server/index.mjs`) servește site-ul, API-ul și fișierele

## Pages

| Path | Page |
|---|---|
| `/` | Acasă (hero, calendar, știri, membru) |
| `/about` | Despre federație |
| `/documents` | Documente oficiale |
| `/competitions` | Calendar |
| `/competitions/rules` | Regulamente |
| `/competitions/results` | Rezultate |
| `/news` | Știri |
| `/news/:id` | Articol |
| `/clubs` | Cluburi |
| `/team` | Lot național |
| `/contact` | Contact |
| `/admin` | Admin (login + parolă) |

## Develop

```bash
npm install
cp .env.example .env   # setează ADMIN_USER și ADMIN_PASSWORD
npm run dev
```

Open http://127.0.0.1:5173  
Admin: http://127.0.0.1:5173/admin

Adminul scrie în `data/site.json` (fișier JSON pe disc, nu Postgres). Foto/PDF: `data/uploads`.

```bash
npm run build
npm start
```

Deschide http://127.0.0.1:3000

## Hosting public

Nu merge pe Vercel/Netlify: acolo discul e temporar și știrile dispar. Trebuie un server cu disc persistent.

1. Cont pe [Render](https://render.com) sau [Railway](https://railway.app)
2. Conectează repo-ul GitHub `YR2607/moldova-badminton`
3. Variabile: `ADMIN_USER`, `ADMIN_PASSWORD` (aceleași ca în `.env`), `DATA_DIR=/data`
4. Disc persistent montat la `/data` (în Render e deja în `render.yaml`)
5. După deploy: `https://…/admin`

Domeniu propriu se leagă din dashboard-ul hostului + DNS.

## Ce se editează în admin

- Contact (nume, telefon) + URL Facebook
- Documente oficiale (RO/RU)
- Știri
- Cluburi
- Calendar, regulamente, rezultate
- Lot național
- Despre federație

Textele de interfață și pașii de membru rămân în i18n.

## Notes

- Nu inventăm oficiali, telefoane sau turnee — listele goale așteaptă date reale
- Limba se păstrează în `localStorage` (`mbf-locale`)
- Nu apela Cursor `publish-app` fără cerere
