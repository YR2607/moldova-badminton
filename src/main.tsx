import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SiteProvider } from './content/SiteProvider.tsx'
import I18nProvider from './i18n/I18nProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <SiteProvider>
        <App />
      </SiteProvider>
    </I18nProvider>
  </StrictMode>,
)
