import { Link, NavLink } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import PageHeader from '../components/PageHeader'
import PageShell from '../components/PageShell'
import Subnav from '../components/Subnav'
import { useSite } from '../content/useSite'
import { tournamentDates, upcomingTournaments } from '../data/site'
import { useI18n } from '../i18n/useI18n'

export default function Competitions() {
  const { locale, t } = useI18n()
  const { site } = useSite()
  const c = t.competitions
  const rows = upcomingTournaments(site.tournaments)

  return (
    <PageShell>
      <PageHeader kicker={c.kicker} title={c.calendarTitle} lede={c.calendarLede} />

      <Subnav label={c.subnavLabel}>
        <NavLink to="/competitions" end>
          {t.nav.calendar}
        </NavLink>
        <NavLink to="/competitions/rules">{t.nav.rules}</NavLink>
        <NavLink to="/competitions/results">{t.nav.results}</NavLink>
      </Subnav>

      <div className="page-body page-body-wide">
        {rows.length === 0 ? (
          <EmptyState title={c.emptyTitle}>{c.emptyBody}</EmptyState>
        ) : (
          <ul className="event-list">
            {rows.map((row) => (
              <li key={row.id}>
                <Link to={`/competitions/${row.id}`}>
                  {row.image ? (
                    <img className="event-thumb" src={row.image} alt="" />
                  ) : (
                    <div className="media-ph" aria-hidden="true">
                      {t.common.photoLater}
                    </div>
                  )}
                  <div>
                    <time dateTime={row.dateStart}>{tournamentDates(row, locale)}</time>
                    <h2>{row.name}</h2>
                    {row.place ? <p>{row.place}</p> : null}
                    {row.description ? <p>{row.description}</p> : null}
                  </div>
                </Link>
                {row.registrationHref ? (
                  <a
                    className="cta subtle"
                    href={row.registrationHref}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {c.register}
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </PageShell>
  )
}
