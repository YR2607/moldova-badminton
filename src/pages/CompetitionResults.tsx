import { NavLink } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import PageHeader from '../components/PageHeader'
import PageShell from '../components/PageShell'
import Subnav from '../components/Subnav'
import { useSite } from '../content/useSite'
import { tournamentDates } from '../data/site'
import { useI18n } from '../i18n/useI18n'

export default function CompetitionResults() {
  const { locale, t } = useI18n()
  const { site } = useSite()
  const c = t.competitions
  const rows = site.tournaments.filter((row) => row.resultsHref)

  return (
    <PageShell>
      <PageHeader kicker={c.kicker} title={c.resultsTitle} lede={c.resultsLede} />

      <Subnav label={c.subnavLabel}>
        <NavLink to="/competitions" end>
          {t.nav.calendar}
        </NavLink>
        <NavLink to="/competitions/rules">{t.nav.rules}</NavLink>
        <NavLink to="/competitions/results">{t.nav.results}</NavLink>
      </Subnav>

      <div className="page-body page-body-wide">
        {rows.length === 0 ? (
          <EmptyState title={c.resultsEmptyTitle}>{c.resultsEmptyBody}</EmptyState>
        ) : (
          <ul className="doc-list">
            {rows.map((row) => (
              <li key={row.id}>
                <strong>
                  <a href={row.resultsHref} target="_blank" rel="noreferrer">
                    {row.name}
                  </a>
                </strong>
                <span>{tournamentDates(row, locale)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </PageShell>
  )
}
