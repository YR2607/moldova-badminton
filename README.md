# Federația de Badminton din Republica Moldova

Site oficial (structura fazei 2): temă deschisă instituțională.

## Stack

- Vite + React + TypeScript + React Router
- Design tokens in CSS variables (`src/index.css`) — light paper / court blue / red CTA
- i18n: **Romanian (ro) default**, Russian (ru) via header switch (`src/i18n/`)
- Content strings: `src/i18n/messages.ts`; empty lists: `src/data/content.ts`

## Pages

| Path | Page |
|---|---|
| `/` | Acasă (hero, calendar, știri, membru) |
| `/about` | Despre federație |
| `/about/documents` | Documente |
| `/competitions` | Calendar |
| `/competitions/rules` | Regulamente |
| `/competitions/results` | Rezultate |
| `/news` | Știri |
| `/news/:slug` | Articol |
| `/clubs` | Cluburi |
| `/team` | Lot național |
| `/contact` | Contact |

## Develop

```bash
npm install
npm run dev
```

Open http://127.0.0.1:5173

## Notes

- No invented officials, phones, or events — empty states and structural drafts only
- Language choice persisted in `localStorage` (`mbf-locale`)
- Do not call Cursor `publish-app` unless asked
- Audit / kickoff: project store `docs/federation-site-audit.md`
