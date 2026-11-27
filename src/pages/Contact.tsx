import PageHeader from '../components/PageHeader'
import PageShell from '../components/PageShell'
import { useSite } from '../content/useSite'
import { formatPhone, socialEntries } from '../data/site'
import { useI18n } from '../i18n/useI18n'

export default function Contact() {
  const { t } = useI18n()
  const { site } = useSite()
  const c = t.contact
  const socials = socialEntries(site.contact.social)
  const personPhones = new Set(site.contact.people.map((person) => person.phone).filter(Boolean))
  const phones = site.contact.phones.filter((phone) => !personPhones.has(phone))

  return (
    <PageShell>
      <PageHeader kicker={c.kicker} title={c.title} lede={c.lede} />

      <div className="page-body">
        <dl className="contact-list">
          {site.contact.email ? (
            <div>
              <dt>{c.email}</dt>
              <dd>
                <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
              </dd>
            </div>
          ) : null}
          {phones.map((phone) => (
            <div key={phone}>
              <dt>{c.phone}</dt>
              <dd>
                <a href={`tel:${phone}`}>{formatPhone(phone)}</a>
              </dd>
            </div>
          ))}
          {site.contact.people.map((person) => (
            <div key={person.id}>
              <dt>{person.name || c.name}</dt>
              <dd>
                {person.phone ? (
                  <a href={`tel:${person.phone}`}>{formatPhone(person.phone)}</a>
                ) : (
                  '—'
                )}
              </dd>
            </div>
          ))}
          {socials.length > 0 ? (
            <div>
              <dt>{c.social}</dt>
              <dd className="social-links">
                {socials.map((item) => (
                  <a key={item.key} href={item.href} target="_blank" rel="noreferrer">
                    {item.label}
                  </a>
                ))}
              </dd>
            </div>
          ) : null}
        </dl>
      </div>
    </PageShell>
  )
}
