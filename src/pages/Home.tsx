import { Link } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import Section from '../components/Section'
import { tournaments } from '../data/content'
import { useI18n } from '../i18n/useI18n'

export default function Home() {
  const { t } = useI18n()

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-inner">
          <img
            className="hero-logo"
            src="/federation-logo.png"
            alt={`${t.brand.abbr} — ${t.brand.full}`}
            width={220}
            height={285}
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
        {tournaments.length === 0 ? (
          <EmptyState title={t.home.calendarEmptyTitle}>{t.home.calendarEmptyBody}</EmptyState>
        ) : null}
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
        <ul className="news-teasers">
          {t.news.items.map((item) => (
            <li key={item.slug}>
              <Link to={`/news/${item.slug}`}>
                <div className="media-ph" aria-hidden="true">
                  {t.common.photoLater}
                </div>
                {item.draftStructure ? (
                  <span className="status-chip">{t.common.draftChip}</span>
                ) : null}
                <time dateTime={item.date}>{item.dateLabel}</time>
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
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
