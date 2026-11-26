import { Link, Navigate, useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import PageShell from '../components/PageShell'
import { useI18n } from '../i18n/useI18n'

export default function NewsArticle() {
  const { slug } = useParams()
  const { t } = useI18n()
  const item = t.news.items.find((entry) => entry.slug === slug)

  if (!item) {
    return <Navigate to="/news" replace />
  }

  return (
    <PageShell>
      <PageHeader
        kicker={t.news.kicker}
        title={item.title}
        back={
          <Link className="section-link" to="/news">
            {t.news.back}
          </Link>
        }
        meta={
          <>
            <time dateTime={item.date}>{item.dateLabel}</time>
            {item.draftStructure ? <span className="status-chip">{t.common.draftChip}</span> : null}
          </>
        }
      />

      <div className="page-body">
        <div className="prose">
          {item.body.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
