export default function Contact() {
  return (
    <article className="content">
      <header className="content-head">
        <p className="kicker">Контакты</p>
        <h1>Связаться с нами</h1>
        <p className="lede">
          Реквизиты появятся после подтверждения федерацией. Ниже — явные
          плейсхолдеры, без выдуманных телефонов и адресов.
        </p>
      </header>

      <div className="prose">
        <dl className="contact-list">
          <div>
            <dt>Email</dt>
            <dd>
              <span className="ph">[email — подтвердить]</span>
            </dd>
          </div>
          <div>
            <dt>Телефон</dt>
            <dd>
              <span className="ph">[телефон — подтвердить]</span>
            </dd>
          </div>
          <div>
            <dt>Адрес</dt>
            <dd>
              <span className="ph">[адрес в Кишинёве — подтвердить]</span>
            </dd>
          </div>
          <div>
            <dt>Соцсети</dt>
            <dd>
              <span className="ph">[ссылки — подтвердить]</span>
            </dd>
          </div>
        </dl>

        <p className="note">
          Форма обратной связи будет добавлена, когда будет согласован рабочий email
          для писем.
        </p>
      </div>
    </article>
  )
}
