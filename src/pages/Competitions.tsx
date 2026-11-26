import { DEMO_LABEL, demoTournaments } from '../data/demo'

export default function Competitions() {
  return (
    <article className="content content-wide">
      <header className="content-head">
        <p className="kicker">Соревнования</p>
        <h1>Календарь и результаты</h1>
        <p className="lede">
          Пример сезона для демонстрации структуры. Реальные даты заменит федерация.
        </p>
      </header>

      <p className="demo-banner" role="note">
        {DEMO_LABEL}: турниры ниже вымышлены для макета сайта.
      </p>

      <div className="prose">
        <h2>Календарь 2026</h2>

        <div className="stub-table" role="table" aria-label="Демо-календарь турниров">
          <div className="stub-row stub-head" role="row">
            <span role="columnheader">Дата</span>
            <span role="columnheader">Турнир</span>
            <span role="columnheader">Место</span>
            <span role="columnheader">Статус</span>
          </div>
          {demoTournaments.map((t) => (
            <div className="stub-row" role="row" key={t.name}>
              <span role="cell">{t.dates}</span>
              <span role="cell">{t.name}</span>
              <span role="cell">{t.place}</span>
              <span role="cell">{t.status}</span>
            </div>
          ))}
        </div>

        <h2>Регламенты и результаты</h2>
        <p className="placeholder">
          PDF регламентов и протоколы результатов появятся вместе с официальным
          календарём. Сейчас — только демо-таблица выше.
        </p>
      </div>
    </article>
  )
}
