import { Link, NavLink } from 'react-router-dom'
import DataTable from '../components/DataTable'
import EmptyState from '../components/EmptyState'
import Notice from '../components/Notice'
import PageHeader from '../components/PageHeader'
import PageShell from '../components/PageShell'
import Subnav from '../components/Subnav'
import { tournaments, type Tournament } from '../data/content'
import { useI18n } from '../i18n/useI18n'

export default function Competitions() {
  const { t } = useI18n()
  const c = t.competitions

  const columns = [
    {
      key: 'name',
      header: c.colName,
      render: (row: Tournament) => <strong>{row.name}</strong>,
    },
    {
      key: 'dates',
      header: c.colDates,
      render: (row: Tournament) => row.dates,
    },
    {
      key: 'place',
      header: c.colPlace,
      render: (row: Tournament) => row.place,
    },
    {
      key: 'rules',
      header: c.colRules,
      render: (row: Tournament) =>
        row.rulesHref ? <Link to={row.rulesHref}>{c.colRules}</Link> : '—',
    },
    {
      key: 'results',
      header: c.colResults,
      render: (row: Tournament) =>
        row.resultsHref ? <Link to={row.resultsHref}>{c.colResults}</Link> : '—',
    },
  ]

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
        <Notice>{c.calendarNotice}</Notice>

        {tournaments.length === 0 ? (
          <EmptyState title={c.emptyTitle}>{c.emptyBody}</EmptyState>
        ) : (
          <DataTable
            columns={columns}
            rows={tournaments}
            caption={c.tableCaption}
            getRowKey={(row) => row.id}
          />
        )}
      </div>
    </PageShell>
  )
}
