import { Link } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import PageHeader from '../components/PageHeader'
import PageShell from '../components/PageShell'
import { useSite } from '../content/useSite'
import { formatPostDate, publishedNews } from '../data/site'
import { useI18n } from '../i18n/useI18n'

export default function News() {
  const { locale, t } = useI18n()
  const { site } = useSite()
  const news = publishedNews(site.news)
  const facebook = site.contact.social.facebook

  return (
    <PageShell>
      <PageHeader kicker={t.news.kicker} title={t.news.listTitle} lede={t.news.listLede} />

      <div className="page-body page-body-wide">
        {news.length === 0 ? (
          <EmptyState title={t.news.emptyTitle}>
            {t.news.emptyBody}
            {facebook ? (
              <>
                {' '}
                <a href={facebook} target="_blank" rel="noreferrer">
                  {t.news.openFacebook}
                </a>
              </>
            ) : null}
          </EmptyState>
        ) : (
          <ul className="news-list">
            {news.map((item) => (
              <li key={item.id}>
                <Link to={`/news/${item.slug || item.id}`}>
                  {item.image ? <img className="news-thumb" src={item.image} alt="" /> : null}
                  <time dateTime={item.date}>{formatPostDate(item.date, locale)}</time>
                  {item.category ? <span className="news-cat">{item.category}</span> : null}
                  <h2>{item.title}</h2>
                  <p>{item.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </PageShell>
  )
}
