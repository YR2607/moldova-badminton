import EmptyState from '../components/EmptyState'
import PageHeader from '../components/PageHeader'
import PageShell from '../components/PageShell'
import { useSite } from '../content/useSite'
import { memberName, teamGroups } from '../data/site'
import { useI18n } from '../i18n/useI18n'

export default function Team() {
  const { t } = useI18n()
  const { site } = useSite()
  const groups = teamGroups(site.team)

  return (
    <PageShell>
      <PageHeader kicker={t.team.kicker} title={t.team.title} lede={t.team.lede} />

      <div className="page-body page-body-wide">
        {groups.length === 0 ? (
          <EmptyState title={t.team.emptyTitle}>{t.team.emptyBody}</EmptyState>
        ) : (
          groups.map((group) => (
            <section className="team-group" key={group.category}>
              <h2>{t.team.categories[group.category]}</h2>
              <ul className="team-grid">
                {group.members.map((member) => (
                  <li key={member.id}>
                    {member.photo ? (
                      <img src={member.photo} alt="" />
                    ) : (
                      <div className="media-ph" aria-hidden="true">
                        {t.common.photoLater}
                      </div>
                    )}
                    <strong>{memberName(member)}</strong>
                    {member.rank ? (
                      <span>
                        {t.team.rank}: {member.rank}
                      </span>
                    ) : null}
                    {member.club ? (
                      <span>
                        {t.team.club}: {member.club}
                      </span>
                    ) : null}
                    {member.coach ? (
                      <span>
                        {t.team.coach}: {member.coach}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}
      </div>
    </PageShell>
  )
}
