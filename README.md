# Moldavian Badminton Federation

Site oficial: temă deschisă instituțională. Limba implicită — română, comutator RU în header.

## Stack

- Vite + React + TypeScript + React Router
- Design tokens in CSS variables (`src/index.css`)
- i18n: `src/i18n/messages.ts` (RO default)
- Conținut dinamic: `data/site.json` (editat din admin)

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
| `/admin` | Admin (parolă) |

## Develop

```bash
npm install
cp .env.example .env   # setează ADMIN_PASSWORD
npm run dev
```

Open http://127.0.0.1:5173  
Admin: http://127.0.0.1:5173/admin

Adminul scrie în `data/site.json` și funcționează doar cu `npm run dev`.

## Ce se editează în admin

- Contact (nume, telefon) + URL Facebook
- Documente oficiale (RO/RU)
- Știri
- Cluburi
- Calendar (inclusiv linkuri regulament / rezultate)
- Lot național

Textele de interfață, «Despre federație» și pașii de membru rămân în i18n.

## Notes

- Nu inventăm oficiali, telefoane sau turnee — listele goale așteaptă date reale
- Limba se păstrează în `localStorage` (`mbf-locale`)
- Nu apela Cursor `publish-app` fără cerere
