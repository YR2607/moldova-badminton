import { useId, useState } from 'react'
import './App.css'

const NAV = [
  { label: 'Despre', href: '#despre' },
  { label: 'Competiții', href: '#competitii' },
  { label: 'Cluburi', href: '#cluburi' },
  { label: 'Contact', href: '#contact' },
]

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="page">
      <a className="skip" href="#main">
        Salt la conținut
      </a>

      <header className="top">
        <div className="brand-mark" aria-hidden="true">
          <span className="mark-orb" />
          <span className="mark-feather" />
        </div>
        <p className="brand-name">
          Federația de Badminton
          <span>a Moldovei</span>
        </p>
        <nav className="nav" aria-label="Principal">
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="lang" href="#despre" title="Limba — RO (RU în curând)">
          RO
        </a>
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? 'Închide meniul' : 'Deschide meniul'}</span>
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </header>

      {menuOpen ? (
        <nav id={menuId} className="mobile-nav" aria-label="Mobil">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
        </nav>
      ) : null}

      <main id="main">
        <section className="hero" aria-labelledby="hero-brand">
          <div className="hero-atmosphere" aria-hidden="true">
            <div className="fog fog-a" />
            <div className="fog fog-b" />
            <div className="court-lines">
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="shuttle-glow" />
          </div>

          <div className="hero-copy">
            <p className="eyebrow" id="hero-brand">
              Federația de Badminton a Moldovei
            </p>
            <h1>
              Badmintonul național,
              <em> pe terenul nostru</em>
            </h1>
            <p className="lede">
              Competiții, cluburi și dezvoltarea sportului în Republica Moldova —
              membru BWF / Badminton Europe.
            </p>
            <div className="cta-row">
              <a className="cta primary" href="#contact">
                Contactează federația
              </a>
              <a className="cta ghost" href="#competitii">
                Vezi calendarul
              </a>
            </div>
          </div>
        </section>

        <section className="band" id="despre">
          <h2>Despre federație</h2>
          <p>
            Federația de Badminton a Moldovei reprezintă sportul pe plan național și
            internațional. Site-ul este în construcție — conținutul oficial (conducere,
            documente, calendar) va fi publicat după confirmarea federației.
          </p>
        </section>

        <section className="band" id="competitii">
          <h2>Competiții</h2>
          <p className="placeholder">
            Calendarul sezonului — <em>în curând</em>. Nu inventăm evenimente: datele vor
            veni direct de la federație.
          </p>
        </section>

        <section className="band" id="cluburi">
          <h2>Cluburi</h2>
          <p className="placeholder">
            Lista cluburilor afiliate (oraș, sală, contact) — <em>placeholder</em>. Trimiteți
            lista actualizată pentru publicare.
          </p>
        </section>

        <section className="band contact" id="contact">
          <h2>Contact</h2>
          <dl className="contact-list">
            <div>
              <dt>Email</dt>
              <dd>
                <span className="ph">[email de confirmat]</span>
              </dd>
            </div>
            <div>
              <dt>Telefon</dt>
              <dd>
                <span className="ph">[telefon de confirmat]</span>
              </dd>
            </div>
            <div>
              <dt>Adresă</dt>
              <dd>
                <span className="ph">[adresă Chișinău — de confirmat]</span>
              </dd>
            </div>
          </dl>
        </section>
      </main>

      <footer className="foot">
        <p>© {new Date().getFullYear()} Federația de Badminton a Moldovei</p>
        <p className="muted">MVP · site în dezvoltare · fără date neconfirmate</p>
      </footer>
    </div>
  )
}
