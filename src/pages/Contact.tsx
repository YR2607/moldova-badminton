import { DEMO_LABEL, demoContact } from '../data/demo'

export default function Contact() {
  return (
    <article className="content">
      <header className="content-head">
        <p className="kicker">Контакты</p>
        <h1>Связаться с нами</h1>
        <p className="lede">
          Ниже — демо-реквизиты для макета. Замените на официальные данные федерации.
        </p>
      </header>

      <p className="demo-banner" role="note">
        {DEMO_LABEL}: email, телефон и адрес не являются официальными.
      </p>

      <div className="prose">
        <dl className="contact-list">
          <div>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${demoContact.email}`}>{demoContact.email}</a>
              <span className="demo-tag">мок</span>
            </dd>
          </div>
          <div>
            <dt>Телефон</dt>
            <dd>
              <a href={`tel:${demoContact.phone.replace(/\s/g, '')}`}>{demoContact.phone}</a>
              <span className="demo-tag">мок</span>
            </dd>
          </div>
          <div>
            <dt>Адрес</dt>
            <dd>
              {demoContact.address}
              <span className="demo-tag">мок</span>
            </dd>
          </div>
          <div>
            <dt>Соцсети</dt>
            <dd>
              {demoContact.social}
              <span className="demo-tag">мок</span>
            </dd>
          </div>
        </dl>

        <p className="note">
          Форма обратной связи появится после согласования рабочего ящика. Пока
          используйте демо-email только как пример интерфейса.
        </p>
      </div>
    </article>
  )
}
