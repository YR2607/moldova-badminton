import EmptyState from '../components/EmptyState'
import Notice from '../components/Notice'
import PageHeader from '../components/PageHeader'
import PageShell from '../components/PageShell'
import { useI18n } from '../i18n/useI18n'

export default function Team() {
  const { t } = useI18n()

  return (
    <PageShell>
      <PageHeader kicker={t.team.kicker} title={t.team.title} lede={t.team.lede} />

      <div className="page-body page-body-wide">
        <Notice>{t.team.intro}</Notice>
        <EmptyState title={t.team.emptyTitle}>{t.team.emptyBody}</EmptyState>
      </div>
    </PageShell>
  )
}
