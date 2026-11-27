import EmptyState from '../components/EmptyState'
import PageHeader from '../components/PageHeader'
import PageShell from '../components/PageShell'
import { useSite } from '../content/useSite'
import { useI18n } from '../i18n/useI18n'

export default function Clubs() {
  const { t } = useI18n()
  const { site } = useSite()

  return (
    <PageShell>
      <PageHeader kicker={t.clubs.kicker} title={t.clubs.title} lede={t.clubs.lede} />

      <div className="page-body page-body-wide">
        {site.clubs.length === 0 ? (
          <EmptyState title={t.clubs.emptyTitle}>{t.clubs.emptyBody}</EmptyState>
        ) : (
          <ul className="club-list">
            {site.clubs.map((club) => (
              <li key={club.id}>
                <strong>{club.name}</strong>
                {club.city ? <span>{club.city}</span> : null}
                {club.hall ? <span>{club.hall}</span> : null}
                {club.contact ? <span>{club.contact}</span> : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </PageShell>
  )
}
