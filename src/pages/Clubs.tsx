import EmptyState from '../components/EmptyState'
import Notice from '../components/Notice'
import PageHeader from '../components/PageHeader'
import PageShell from '../components/PageShell'
import { clubs } from '../data/content'
import { useI18n } from '../i18n/useI18n'

export default function Clubs() {
  const { t } = useI18n()

  return (
    <PageShell>
      <PageHeader kicker={t.clubs.kicker} title={t.clubs.title} lede={t.clubs.lede} />

      <div className="page-body page-body-wide">
        <Notice>{t.common.waitingNote}</Notice>

        {clubs.length === 0 ? (
          <EmptyState title={t.clubs.emptyTitle}>{t.clubs.emptyBody}</EmptyState>
        ) : (
          <ul className="club-list">
            {clubs.map((club) => (
              <li key={club.id}>
                <strong>{club.name}</strong>
                <span>{club.city}</span>
                <span>{club.hall}</span>
                <span>{club.contact}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </PageShell>
  )
}
