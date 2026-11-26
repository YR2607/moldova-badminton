import { LOCALES, type Locale } from '../i18n/locale'
import { useI18n } from '../i18n/useI18n'

const LABELS: Record<Locale, string> = {
  ro: 'RO',
  ru: 'RU',
}

export default function LangSwitch() {
  const { locale, setLocale, t } = useI18n()

  return (
    <div className="lang-switch" role="group" aria-label={t.a11y.langSwitch}>
      {LOCALES.map((code) => (
        <button
          key={code}
          type="button"
          className={locale === code ? 'active' : undefined}
          aria-pressed={locale === code}
          onClick={() => setLocale(code)}
        >
          {LABELS[code]}
        </button>
      ))}
    </div>
  )
}
