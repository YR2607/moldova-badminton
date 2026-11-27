import { Link } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import Section from '../components/Section'
import { useSite } from '../content/useSite'
import { formatPostDate, publishedNews, tournamentDates, upcomingTournaments } from '../data/site'
import { useI18n } from '../i18n/useI18n'

export default function Home() {
  const { locale, t } = useI18n()
  const { site } = useSite()
  const upcoming = upcomingTournaments(site.tournaments).slice(0, 3)
  const news = publishedNews(site.news).slice(0, 3)
  const facebook = site.contact.social.facebook

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-inner">
          <img
            className="hero-logo"
            src="/federation-logo.png"
            alt={`${t.brand.abbr} — ${t.brand.full}`}
            width={256}
            height={256}
          />
          <div className="hero-copy">
            <p className="eyebrow" id="hero-brand">
              {t.brand.full}
            </p>
            <h1 id="hero-title">
              {t.home.headline}
              <em>{t.home.headlineEm}</em>
            </h1>
            <p className="lede">
              {t.home.lede} {t.common.membership}
            </p>
            <div className="cta-row">
              <Link className="cta primary" to="/contact">
                {t.home.ctaContact}
              </Link>
              <Link className="cta ghost" to="/competitions">
                {t.home.ctaCalendar}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Section
        title={t.home.upcomingTitle}
        description={t.home.upcomingDesc}
        action={
          <Link className="section-link" to="/competitions">
            {t.home.upcomingLink}
          </Link>
        }
      >
        {upcoming.length === 0 ? (
          <EmptyState title={t.home.calendarEmptyTitle}>{t.home.calendarEmptyBody}</EmptyState>
        ) : (
          <ul className="club-list">
            {upcoming.map((row) => (
              <li key={row.id}>
                <strong>
                  <Link to={`/competitions/${row.id}`}>{row.name}</Link>
                </strong>
                <span>{tournamentDates(row, locale)}</span>
                {row.place ? <span>{row.place}</span> : null}
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section
        title={t.home.newsTitle}
        description={t.home.newsDesc}
        action={
          <Link className="section-link" to="/news">
            {t.home.newsLink}
          </Link>
        }
      >
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
          <ul className="news-teasers">
            {news.map((item) => (
              <li key={item.id}>
                <Link to={`/news/${item.slug || item.id}`}>
                  {item.image ? (
                    <img className="news-thumb" src={item.image} alt="" />
                  ) : (
                    <div className="media-ph" aria-hidden="true">
                      {t.common.photoLater}
                    </div>
                  )}
                  <time dateTime={item.date}>{formatPostDate(item.date, locale)}</time>
                  <h3>{item.title}</h3>
                  <p>{item.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section title={t.home.memberTitle} description={t.home.memberDesc}>
        <ol className="steps">
          {t.membershipSteps.map((step) => (
            <li key={step.n}>
              <span className="step-n">
                {t.home.stepLabel} {step.n}
              </span>
              <strong>{step.title}</strong>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
        <p className="section-followup">
          <Link className="cta subtle" to="/clubs">
            {t.home.clubsLink}
          </Link>
        </p>
      </Section>
    </>
  )
}
