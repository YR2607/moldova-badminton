import { Link, Navigate, NavLink, useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import PageShell from '../components/PageShell'
import Subnav from '../components/Subnav'
import { useSite } from '../content/useSite'
import { formatPhone, tournamentDates } from '../data/site'
import { useI18n } from '../i18n/useI18n'

export default function Tournament() {
  const { id } = useParams()
  const { locale, t } = useI18n()
  const { site } = useSite()
  const c = t.competitions
  const row = site.tournaments.find((item) => item.id === id)

  if (!row) {
    return <Navigate to="/competitions" replace />
  }

  return (
    <PageShell>
      <PageHeader
        kicker={c.kicker}
        title={row.name}
        back={
          <Link className="section-link" to="/competitions">
            {c.back}
          </Link>
        }
        meta={<time dateTime={row.dateStart}>{tournamentDates(row, locale)}</time>}
      />

      <Subnav label={c.subnavLabel}>
        <NavLink to="/competitions" end>
          {t.nav.calendar}
        </NavLink>
        <NavLink to="/competitions/rules">{t.nav.rules}</NavLink>
        <NavLink to="/competitions/results">{t.nav.results}</NavLink>
      </Subnav>

      <div className="page-body">
        {row.image ? <img className="article-image" src={row.image} alt="" /> : null}
        <div className="prose">
          {row.place ? <p>{row.place}</p> : null}
          {row.description
            ? row.description.split(/\n{2,}/).map((part) => <p key={part.slice(0, 40)}>{part}</p>)
            : null}
          {row.contactName || row.contactPhone ? (
            <p>
              {c.contacts}:{' '}
              {[row.contactName, row.contactPhone ? formatPhone(row.contactPhone) : '']
                .filter(Boolean)
                .join(' · ')}
            </p>
          ) : null}
          {row.registrationHref ? (
            <p>
              <a href={row.registrationHref} target="_blank" rel="noreferrer">
                {c.register}
              </a>
            </p>
          ) : null}
          {row.rulesHref ? (
            <p>
              <a href={row.rulesHref} target="_blank" rel="noreferrer">
                {c.colRules}
              </a>
            </p>
          ) : null}
          {row.resultsHref ? (
            <p>
              <a href={row.resultsHref} target="_blank" rel="noreferrer">
                {c.colResults}
              </a>
            </p>
          ) : null}
        </div>
      </div>
    </PageShell>
  )
}
