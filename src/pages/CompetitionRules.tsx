import { NavLink } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import PageHeader from '../components/PageHeader'
import PageShell from '../components/PageShell'
import Subnav from '../components/Subnav'
import { useSite } from '../content/useSite'
import { tournamentDates } from '../data/site'
import { useI18n } from '../i18n/useI18n'

export default function CompetitionRules() {
  const { locale, t } = useI18n()
  const { site } = useSite()
  const c = t.competitions
  const general = site.generalRules.filter((doc) => doc.href)
  const rows = site.tournaments.filter((row) => row.rulesHref)

  return (
    <PageShell>
      <PageHeader kicker={c.kicker} title={c.rulesTitle} lede={c.rulesLede} />

      <Subnav label={c.subnavLabel}>
        <NavLink to="/competitions" end>
          {t.nav.calendar}
        </NavLink>
        <NavLink to="/competitions/rules">{t.nav.rules}</NavLink>
        <NavLink to="/competitions/results">{t.nav.results}</NavLink>
      </Subnav>

      <div className="page-body page-body-wide">
        {general.length === 0 && rows.length === 0 ? (
          <EmptyState title={c.rulesEmptyTitle}>{c.rulesEmptyBody}</EmptyState>
        ) : (
          <>
            {general.length > 0 ? (
              <>
                <h2 className="list-heading">{c.generalRules}</h2>
                <ul className="doc-list">
                  {general.map((doc) => (
                    <li key={doc.id}>
                      <strong>
                        <a href={doc.href} target="_blank" rel="noreferrer">
                          {doc.title[locale] || doc.title.ro}
                        </a>
                      </strong>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
            {rows.length > 0 ? (
              <>
                <h2 className="list-heading">{c.tournamentRules}</h2>
                <ul className="doc-list">
                  {rows.map((row) => (
                    <li key={row.id}>
                      <strong>
                        <a href={row.rulesHref} target="_blank" rel="noreferrer">
                          {row.name}
                        </a>
                      </strong>
                      <span>{tournamentDates(row, locale)}</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </>
        )}
      </div>
    </PageShell>
  )
}
