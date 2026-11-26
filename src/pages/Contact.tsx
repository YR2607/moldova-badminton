import Notice from '../components/Notice'
import PageHeader from '../components/PageHeader'
import PageShell from '../components/PageShell'
import { contactMeta } from '../data/content'
import { useI18n } from '../i18n/useI18n'

export default function Contact() {
  const { t } = useI18n()
  const c = t.contact

  return (
    <PageShell>
      <PageHeader kicker={c.kicker} title={c.title} lede={c.lede} />

      <div className="page-body">
        <Notice>{t.common.waitingNote}</Notice>

        <dl className="contact-list">
          <div>
            <dt>{c.email}</dt>
            <dd>
              {contactMeta.emailIsPlaceholder ? (
                <span className="ph">{contactMeta.email}</span>
              ) : (
                <a href={`mailto:${contactMeta.email}`}>{contactMeta.email}</a>
              )}
            </dd>
          </div>
          <div>
            <dt>{c.phone}</dt>
            <dd>
              <span className={contactMeta.phoneIsPlaceholder ? 'ph' : undefined}>
                {c.phoneValue}
              </span>
            </dd>
          </div>
          <div>
            <dt>{c.address}</dt>
            <dd>
              <span className={contactMeta.addressIsPlaceholder ? 'ph' : undefined}>
                {c.addressValue}
              </span>
            </dd>
          </div>
          <div>
            <dt>{c.social}</dt>
            <dd className="muted">{c.socialValue}</dd>
          </div>
        </dl>

        <p className="note">{c.formNote}</p>
      </div>
    </PageShell>
  )
}
