import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import PageShell from '../components/PageShell'
import { useSite } from '../content/useSite'
import { newsParagraphs } from '../data/site'
import { useI18n } from '../i18n/useI18n'

export default function About() {
  const { locale, t } = useI18n()
  const { site } = useSite()
  const about = site.about
  const intro = newsParagraphs(about.intro[locale] || about.intro.ro)

  return (
    <PageShell>
      <PageHeader kicker={t.about.kicker} title={about.title[locale]} lede={about.lede[locale]} />

      <div className="page-body">
        <div className="prose">
          {intro.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}

          {about.activities.length > 0 ? (
            <>
              <h2>{about.activitiesTitle[locale]}</h2>
              <ul>
                {about.activities.map((item) => (
                  <li key={item.id}>{item.text[locale] || item.text.ro}</li>
                ))}
              </ul>
            </>
          ) : null}

          <h2>{about.leadershipTitle[locale]}</h2>
        </div>
        {about.leadership.length === 0 ? (
          <p className="placeholder">{t.about.leadershipBody}</p>
        ) : (
          <ul className="team-grid">
            {about.leadership.map((person) => (
              <li key={person.id}>
                {person.photo ? (
                  <img src={person.photo} alt="" />
                ) : (
                  <div className="media-ph" aria-hidden="true">
                    {t.common.photoLater}
                  </div>
                )}
                <strong>{person.name}</strong>
                {person.role[locale] || person.role.ro ? (
                  <span>{person.role[locale] || person.role.ro}</span>
                ) : null}
              </li>
            ))}
          </ul>
        )}
        <div className="prose">
          <h2>{t.about.docsTitle}</h2>
          <p>
            {t.about.docsBodyBefore} <Link to="/documents">{t.about.docsLink}</Link>
          </p>
        </div>
      </div>
    </PageShell>
  )
}
