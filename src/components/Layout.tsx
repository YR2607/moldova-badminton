import { useId, useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { useI18n } from '../i18n/useI18n'
import LangSwitch from './LangSwitch'

const NAV_KEYS = [
  { key: 'about', to: '/about' },
  { key: 'competitions', to: '/competitions' },
  { key: 'news', to: '/news' },
  { key: 'clubs', to: '/clubs' },
  { key: 'team', to: '/team' },
  { key: 'contact', to: '/contact' },
] as const

const FOOT_KEYS = [
  { key: 'about', to: '/about' },
  { key: 'documents', to: '/about/documents' },
  { key: 'calendar', to: '/competitions' },
  { key: 'news', to: '/news' },
  { key: 'clubs', to: '/clubs' },
  { key: 'team', to: '/team' },
  { key: 'contact', to: '/contact' },
] as const

const COPYRIGHT_YEAR = new Date().getFullYear()

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()
  const { t } = useI18n()

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="page">
      <a className="skip" href="#main">
        {t.a11y.skip}
      </a>

      <header className="top">
        <Link to="/" className="brand-link" onClick={closeMenu}>
          <img
            className="brand-logo"
            src="/federation-mark.png"
            alt=""
            width={72}
            height={43}
          />
          <span className="brand-name">
            {t.brand.line1}
            <span>{t.brand.line2}</span>
          </span>
        </Link>

        <nav className="nav" aria-label={t.a11y.mainNav}>
          {NAV_KEYS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              {t.nav[item.key]}
            </NavLink>
          ))}
        </nav>

        <LangSwitch />

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? t.a11y.closeMenu : t.a11y.openMenu}</span>
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </header>

      {menuOpen ? (
        <nav id={menuId} className="mobile-nav" aria-label={t.a11y.mobileNav}>
          <NavLink to="/" onClick={closeMenu} end>
            {t.nav.home}
          </NavLink>
          {NAV_KEYS.map((item) => (
            <NavLink key={item.to} to={item.to} onClick={closeMenu}>
              {t.nav[item.key]}
            </NavLink>
          ))}
        </nav>
      ) : null}

      <main id="main">
        <Outlet />
      </main>

      <footer className="foot">
        <div className="foot-grid">
          <div>
            <h2>{t.footer.federation}</h2>
            <p className="muted foot-blurb">{t.footer.blurb}</p>
          </div>
          <div>
            <h2>{t.footer.sections}</h2>
            <ul className="foot-links">
              {FOOT_KEYS.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{t.nav[item.key]}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>{t.footer.partners}</h2>
            <div className="partners" aria-label={t.a11y.partners}>
              <span className="partner-slot">BWF</span>
              <span className="partner-slot">BEC</span>
              <span className="partner-slot">{t.footer.noc}</span>
            </div>
            <p className="muted foot-note">{t.footer.partnersNote}</p>
          </div>
        </div>
        <div className="foot-bottom">
          <p>
            © {COPYRIGHT_YEAR} {t.brand.full} · {t.brand.abbr}
          </p>
          <p>{t.footer.dataNote}</p>
        </div>
      </footer>
    </div>
  )
}
