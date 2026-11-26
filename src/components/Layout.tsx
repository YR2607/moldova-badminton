import { useId, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'

const NAV = [
  { label: 'О федерации', to: '/about' },
  { label: 'Соревнования', to: '/competitions' },
  { label: 'Клубы', to: '/clubs' },
  { label: 'Контакты', to: '/contact' },
]

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className={`page${isHome ? ' page-home' : ' page-inner'}`}>
      <a className="skip" href="#main">
        Перейти к содержимому
      </a>

      <header className={`top${isHome ? ' top-over-hero' : ''}`}>
        <Link to="/" className="brand-link" onClick={closeMenu}>
          <img
            className="brand-logo"
            src="/federation-mark.png"
            alt=""
            width={72}
            height={43}
          />
          <span className="brand-name">
            Федерация бадминтона
            <span>Молдовы</span>
          </span>
        </Link>

        <nav className="nav" aria-label="Основная навигация">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'active' : undefined)}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <span className="lang" title="Язык интерфейса — русский (румынский позже)">
          RU
        </span>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? 'Закрыть меню' : 'Открыть меню'}</span>
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </header>

      {menuOpen ? (
        <nav id={menuId} className="mobile-nav" aria-label="Мобильное меню">
          <NavLink to="/" onClick={closeMenu} end>
            Главная
          </NavLink>
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} onClick={closeMenu}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      ) : null}

      <main id="main">
        <Outlet />
      </main>

      <footer className="foot">
        <p>© {new Date().getFullYear()} Федерация бадминтона Молдовы · MBF</p>
        <p className="muted">MVP · сайт в разработке · без неподтверждённых данных</p>
      </footer>
    </div>
  )
}
