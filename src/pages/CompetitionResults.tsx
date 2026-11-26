import { NavLink } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import Notice from '../components/Notice'
import PageHeader from '../components/PageHeader'
import PageShell from '../components/PageShell'
import Subnav from '../components/Subnav'
import { useI18n } from '../i18n/useI18n'

export default function CompetitionResults() {
  const { t } = useI18n()
  const c = t.competitions

  return (
    <PageShell>
      <PageHeader kicker={c.kicker} title={c.resultsTitle} lede={c.resultsLede} />

      <Subnav label={c.subnavLabel}>
        <NavLink to="/competitions">{t.nav.calendar}</NavLink>
        <NavLink to="/competitions/rules">{t.nav.rules}</NavLink>
        <NavLink to="/competitions/results">{t.nav.results}</NavLink>
      </Subnav>

      <div className="page-body page-body-wide">
        <Notice>{c.resultsNotice}</Notice>
        <EmptyState title={c.resultsEmptyTitle}>{c.resultsEmptyBody}</EmptyState>
      </div>
    </PageShell>
  )
}
