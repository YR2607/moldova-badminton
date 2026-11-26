export default function Clubs() {
  return (
    <article className="content">
      <header className="content-head">
        <p className="kicker">Клубы</p>
        <h1>Где играть</h1>
        <p className="lede">
          Список аффилированных клубов с городом, залом и контактом — после получения
          актуального перечня.
        </p>
      </header>

      <div className="prose">
        <p className="placeholder">
          Список клубов — <em>заглушка</em>. Пришлите обновлённый перечень для
          публикации.
        </p>

        <ul className="club-stubs">
          <li>
            <strong>[Название клуба]</strong>
            <span>Город: [город]</span>
            <span>Зал: [адрес зала]</span>
            <span>Контакт: [телефон / email]</span>
          </li>
          <li>
            <strong>[Название клуба]</strong>
            <span>Город: [город]</span>
            <span>Зал: [адрес зала]</span>
            <span>Контакт: [телефон / email]</span>
          </li>
          <li>
            <strong>[Название клуба]</strong>
            <span>Город: [город]</span>
            <span>Зал: [адрес зала]</span>
            <span>Контакт: [телефон / email]</span>
          </li>
        </ul>
      </div>
    </article>
  )
}
