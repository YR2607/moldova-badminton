import { Link, NavLink } from 'react-router-dom'
import Notice from '../components/Notice'
import PageHeader from '../components/PageHeader'
import PageShell from '../components/PageShell'
import Subnav from '../components/Subnav'
import { useI18n } from '../i18n/useI18n'

export default function About() {
  const { t } = useI18n()

  return (
    <PageShell>
      <PageHeader kicker={t.about.kicker} title={t.about.title} lede={t.about.lede} />

      <Subnav label={t.documents.subnavLabel}>
        <NavLink to="/about" end>
          {t.nav.about}
        </NavLink>
        <NavLink to="/about/documents">{t.nav.documents}</NavLink>
      </Subnav>

      <div className="page-body">
        <Notice>
          {t.common.waitingNote} {t.about.notice}
        </Notice>

        <div className="prose">
          <p>
            {t.about.p1} {t.common.membership}
          </p>
          <p>{t.common.foundedNote}</p>

          <h2>{t.about.activitiesTitle}</h2>
          <ul>
            {t.about.activities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2>{t.about.leadershipTitle}</h2>
          <p className="placeholder">{t.about.leadershipBody}</p>

          <h2>{t.about.docsTitle}</h2>
          <p>
            {t.about.docsBodyBefore} <Link to="/about/documents">{t.about.docsLink}</Link>
          </p>
        </div>
      </div>
    </PageShell>
  )
}
