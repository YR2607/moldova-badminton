import { Link, Navigate, useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import PageShell from '../components/PageShell'
import { useSite } from '../content/useSite'
import {
  findNews,
  formatPostDate,
  isHtml,
  newsParagraphs,
  sanitizeHtml,
} from '../data/site'
import { useI18n } from '../i18n/useI18n'

export default function NewsArticle() {
  const { slug } = useParams()
  const { locale, t } = useI18n()
  const { site } = useSite()
  const item = findNews(site.news, slug)

  if (!item || item.status === 'draft') {
    return <Navigate to="/news" replace />
  }

  return (
    <PageShell>
      <PageHeader
        kicker={item.category || t.news.kicker}
        title={item.title}
        back={
          <Link className="section-link" to="/news">
            {t.news.back}
          </Link>
        }
        meta={<time dateTime={item.date}>{formatPostDate(item.date, locale)}</time>}
      />

      <div className="page-body">
        {item.image ? <img className="article-image" src={item.image} alt="" /> : null}
        <div className="prose">
          {isHtml(item.body) ? (
            <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.body) }} />
          ) : (
            newsParagraphs(item.body).map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))
          )}
          {item.sourceUrl ? (
            <p>
              <a href={item.sourceUrl} target="_blank" rel="noreferrer">
                {t.news.sourceLink}
              </a>
            </p>
          ) : null}
        </div>
      </div>
    </PageShell>
  )
}
