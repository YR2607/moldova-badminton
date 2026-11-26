import { NavLink } from 'react-router-dom'
import Notice from '../components/Notice'
import PageHeader from '../components/PageHeader'
import PageShell from '../components/PageShell'
import Subnav from '../components/Subnav'
import { useI18n } from '../i18n/useI18n'

export default function Documents() {
  const { t } = useI18n()

  return (
    <PageShell>
      <PageHeader
        kicker={t.documents.kicker}
        title={t.documents.title}
        lede={t.documents.lede}
      />

      <Subnav label={t.documents.subnavLabel}>
        <NavLink to="/about" end>
          {t.nav.about}
        </NavLink>
        <NavLink to="/about/documents">{t.nav.documents}</NavLink>
      </Subnav>

      <div className="page-body page-body-wide">
        <Notice>{t.documents.notice}</Notice>

        <ul className="doc-list">
          {t.documents.items.map((doc) => (
            <li key={doc.id}>
              <strong>{doc.title}</strong>
              <span>{doc.description}</span>
              <span className="status-chip">{doc.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </PageShell>
  )
}
