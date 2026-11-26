import { DEMO_LABEL, demoClubs } from '../data/demo'

export default function Clubs() {
  return (
    <article className="content">
      <header className="content-head">
        <p className="kicker">Клубы</p>
        <h1>Где играть</h1>
        <p className="lede">
          Несколько демо-клубов, чтобы показать формат списка. Актуальный перечень
          предоставит федерация.
        </p>
      </header>

      <p className="demo-banner" role="note">
        {DEMO_LABEL}: названия, залы и контакты клубов — вымышленные.
      </p>

      <div className="prose">
        <ul className="club-stubs">
          {demoClubs.map((club) => (
            <li key={club.name}>
              <strong>{club.name}</strong>
              <span>Город: {club.city}</span>
              <span>Зал: {club.hall}</span>
              <span>Контакт: {club.contact}</span>
              <span className="demo-tag">мок</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
