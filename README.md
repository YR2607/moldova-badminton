# Федерация бадминтона Молдовы — MVP

Landing and core pages for the Moldova Badminton Federation website.

## Stack

- Vite + React + TypeScript + React Router
- Design tokens in CSS variables (`src/index.css`)
- **Default UI language: Russian (ru)** — Romanian later via i18n

## Pages

| Path | Page |
|---|---|
| `/` | Главная (hero) |
| `/about` | О федерации |
| `/competitions` | Соревнования / календарь (stub) |
| `/clubs` | Клубы (stub) |
| `/contact` | Контакты (placeholders) |

## Develop

```bash
npm install
npm run dev
```

Open http://127.0.0.1:5173

## Notes

- No invented officials, phones, or events — placeholders only
- Do not call Cursor `publish-app` unless asked
- Audit / kickoff: project store `docs/federation-site-audit.md`
