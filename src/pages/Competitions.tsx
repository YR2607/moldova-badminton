export default function Competitions() {
  return (
    <article className="content">
      <header className="content-head">
        <p className="kicker">Соревнования</p>
        <h1>Календарь и результаты</h1>
        <p className="lede">
          Турниры сезона, регламенты и итоги — когда федерация предоставит данные.
        </p>
      </header>

      <div className="prose">
        <h2>Календарь</h2>
        <p className="placeholder">
          Таблица сезона — <em>скоро</em>. Мы не публикуем выдуманные даты и названия
          турниров.
        </p>

        <div className="stub-table" role="table" aria-label="Заглушка календаря">
          <div className="stub-row stub-head" role="row">
            <span role="columnheader">Дата</span>
            <span role="columnheader">Турнир</span>
            <span role="columnheader">Место</span>
            <span role="columnheader">Статус</span>
          </div>
          <div className="stub-row" role="row">
            <span role="cell">[дата]</span>
            <span role="cell">[название турнира]</span>
            <span role="cell">[город / зал]</span>
            <span role="cell">ожидает данные</span>
          </div>
          <div className="stub-row" role="row">
            <span role="cell">[дата]</span>
            <span role="cell">[название турнира]</span>
            <span role="cell">[город / зал]</span>
            <span role="cell">ожидает данные</span>
          </div>
        </div>

        <h2>Регламенты и результаты</h2>
        <p className="placeholder">
          PDF регламентов и страницы результатов появятся вместе с календарём.
        </p>
      </div>
    </article>
  )
}
