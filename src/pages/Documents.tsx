import EmptyState from '../components/EmptyState'
import PageHeader from '../components/PageHeader'
import PageShell from '../components/PageShell'
import { useSite } from '../content/useSite'
import { useI18n } from '../i18n/useI18n'

export default function Documents() {
  const { locale, t } = useI18n()
  const { site } = useSite()

  return (
    <PageShell>
      <PageHeader
        kicker={t.documents.kicker}
        title={t.documents.title}
        lede={t.documents.lede}
      />

      <div className="page-body page-body-wide">
        {site.documents.length === 0 ? (
          <EmptyState title={t.documents.title}>{t.documents.lede}</EmptyState>
        ) : (
          <ul className="doc-list">
            {site.documents.map((doc) => (
              <li key={doc.id}>
                <strong>
                  <a href={doc.href} target="_blank" rel="noreferrer">
                    {doc.title[locale]}
                  </a>
                </strong>
                <span>{doc.citation[locale]}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </PageShell>
  )
}
