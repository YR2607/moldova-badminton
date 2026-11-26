import { Link } from 'react-router-dom'
import Notice from '../components/Notice'
import PageHeader from '../components/PageHeader'
import PageShell from '../components/PageShell'
import { useI18n } from '../i18n/useI18n'

export default function News() {
  const { t } = useI18n()

  return (
    <PageShell>
      <PageHeader kicker={t.news.kicker} title={t.news.listTitle} lede={t.news.listLede} />

      <div className="page-body page-body-wide">
        <Notice>{t.news.notice}</Notice>

        <ul className="news-list">
          {t.news.items.map((item) => (
            <li key={item.slug}>
              <Link to={`/news/${item.slug}`}>
                <time dateTime={item.date}>{item.dateLabel}</time>
                {item.draftStructure ? (
                  <span className="status-chip">{t.common.draftChip}</span>
                ) : null}
                <h2>{item.title}</h2>
                <p>{item.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </PageShell>
  )
}
