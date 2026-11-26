import { Link } from 'react-router-dom'

export default function Home() {
  return (
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
        <div className="hero-brand" id="hero-brand">
          <img
            className="hero-logo"
            src="/federation-logo.png"
            alt="MBF — Moldavian Badminton Federation"
            width={220}
            height={285}
          />
          <p className="eyebrow">Федерация бадминтона Молдовы</p>
        </div>
        <h1>
          Национальный бадминтон
          <em> на нашем корте</em>
        </h1>
        <p className="lede">
          Соревнования, клубы и развитие спорта в Республике Молдова — член BWF /
          Badminton Europe.
        </p>
        <div className="cta-row">
          <Link className="cta primary" to="/contact">
            Связаться с федерацией
          </Link>
          <Link className="cta ghost" to="/competitions">
            Смотреть календарь
          </Link>
        </div>
      </div>
    </section>
  )
}
