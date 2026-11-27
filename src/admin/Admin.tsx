import { useMemo, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useSite } from '../content/useSite'
import type { SiteClub, SiteData, SiteDocument } from '../data/site'
import { newId } from '../data/site'
import './Admin.css'
import AboutTab from './AboutTab'
import { clearAdminAuth, getAdminAuth, hasAdminSession, setAdminAuth } from './auth'
import CompetitionsTab from './CompetitionsTab'
import ContactTab from './ContactTab'
import NewsTab from './NewsTab'
import TeamTab from './TeamTab'

const TABS = [
  { id: 'about', label: 'О федерации' },
  { id: 'contact', label: 'Контакт' },
  { id: 'documents', label: 'Документы' },
  { id: 'news', label: 'Новости' },
  { id: 'clubs', label: 'Клубы' },
  { id: 'competitions', label: 'Соревнования' },
  { id: 'team', label: 'Сборная' },
] as const

type TabId = (typeof TABS)[number]['id']

export default function Admin() {
  const { site, save } = useSite()
  const [password, setPassword] = useState(() => getAdminAuth().password)
  const [authed, setAuthed] = useState(() => hasAdminSession())
  const [tab, setTab] = useState<TabId>('contact')
  const [error, setError] = useState('')
  const [ok, setOk] = useState('')
  const [user, setUser] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  async function handleLogin(event: FormEvent) {
    event.preventDefault()
    setError('')
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, password: loginPassword }),
    })
    if (!response.ok) {
      setError('Неверный логин или пароль')
      return
    }
    setAdminAuth(user, loginPassword)
    setPassword(loginPassword)
    setAuthed(true)
  }

  async function persist(next: SiteData) {
    setError('')
    setOk('')
    try {
      await save(next, password)
      setOk('Сохранено')
    } catch {
      setError('Не удалось сохранить')
    }
  }

  function logout() {
    clearAdminAuth()
    setAuthed(false)
    setPassword('')
    setUser('')
    setLoginPassword('')
  }

  if (!authed) {
    return (
      <div className="admin">
        <form className="admin-login" onSubmit={handleLogin}>
          <img className="admin-login-logo" src="/federation-logo.png" alt="" width={160} height={160} />
          <h1>Админка MBF</h1>
          <label>
            Логин
            <input
              value={user}
              onChange={(event) => setUser(event.target.value)}
              autoComplete="username"
              autoFocus
            />
          </label>
          <label>
            Пароль
            <input
              type="password"
              value={loginPassword}
              onChange={(event) => setLoginPassword(event.target.value)}
              autoComplete="current-password"
            />
          </label>
          {error ? <p className="admin-error">{error}</p> : null}
          <button className="cta primary" type="submit">
            Войти
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="admin">
      <header className="admin-top">
        <strong className="admin-brand">
          <img src="/federation-mark.png" alt="" width={28} height={28} />
          Админка MBF
        </strong>
        <span>
          <Link to="/">На сайт</Link>
          {' · '}
          <button type="button" onClick={logout}>
            Выйти
          </button>
        </span>
      </header>
      <div className="admin-shell">
        <nav className="admin-nav">
          {TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={tab === item.id ? 'active' : undefined}
              onClick={() => {
                setTab(item.id)
                setOk('')
                setError('')
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <main className={`admin-main${tab === 'news' ? ' admin-main-wide' : ''}`}>
          {error ? <p className="admin-error">{error}</p> : null}
          {ok ? <p className="admin-ok">{ok}</p> : null}
          {tab === 'about' ? <AboutTab site={site} password={password} onSave={persist} /> : null}
          {tab === 'contact' ? <ContactTab site={site} onSave={persist} /> : null}
          {tab === 'documents' ? <DocumentsTab site={site} onSave={persist} /> : null}
          {tab === 'news' ? <NewsTab site={site} password={password} onSave={persist} /> : null}
          {tab === 'clubs' ? <ClubsTab site={site} onSave={persist} /> : null}
          {tab === 'competitions' ? (
            <CompetitionsTab site={site} password={password} onSave={persist} />
          ) : null}
          {tab === 'team' ? <TeamTab site={site} password={password} onSave={persist} /> : null}
        </main>
      </div>
    </div>
  )
}

function DocumentsTab({
  site,
  onSave,
}: {
  site: SiteData
  onSave: (site: SiteData) => Promise<void>
}) {
  const empty = useMemo<SiteDocument>(
    () => ({
      id: '',
      href: '',
      title: { ro: '', ru: '' },
      citation: { ro: '', ru: '' },
    }),
    [],
  )
  const [form, setForm] = useState<SiteDocument>(empty)

  function submit(event: FormEvent) {
    event.preventDefault()
    const item: SiteDocument = {
      ...form,
      id: form.id || newId(),
    }
    const documents = form.id
      ? site.documents.map((doc) => (doc.id === form.id ? item : doc))
      : [item, ...site.documents]
    void onSave({ ...site, documents }).then(() => setForm(empty))
  }

  return (
    <>
      <h1>Официальные документы</h1>
      <form className="admin-form" onSubmit={submit}>
        <label>
          Название RO
          <input
            value={form.title.ro}
            onChange={(event) =>
              setForm({ ...form, title: { ...form.title, ro: event.target.value } })
            }
            required
          />
        </label>
        <label>
          Название RU
          <input
            value={form.title.ru}
            onChange={(event) =>
              setForm({ ...form, title: { ...form.title, ru: event.target.value } })
            }
            required
          />
        </label>
        <label>
          Ссылка
          <input
            value={form.href}
            onChange={(event) => setForm({ ...form, href: event.target.value })}
            required
          />
        </label>
        <label>
          Подпись / цитата RO
          <input
            value={form.citation.ro}
            onChange={(event) =>
              setForm({
                ...form,
                citation: { ...form.citation, ro: event.target.value },
              })
            }
          />
        </label>
        <label>
          Подпись / цитата RU
          <input
            value={form.citation.ru}
            onChange={(event) =>
              setForm({
                ...form,
                citation: { ...form.citation, ru: event.target.value },
              })
            }
          />
        </label>
        <div className="admin-actions">
          <button className="cta primary" type="submit">
            {form.id ? 'Сохранить' : 'Добавить'}
          </button>
          {form.id ? (
            <button className="cta ghost" type="button" onClick={() => setForm(empty)}>
              Отмена
            </button>
          ) : null}
        </div>
      </form>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Документ</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {site.documents.map((doc) => (
            <tr key={doc.id}>
              <td>
                {doc.title.ro}
                <br />
                <span className="muted">{doc.href}</span>
              </td>
              <td>
                <button type="button" onClick={() => setForm(doc)}>
                  Изменить
                </button>
                <button
                  type="button"
                  onClick={() =>
                    void onSave({
                      ...site,
                      documents: site.documents.filter((item) => item.id !== doc.id),
                    })
                  }
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

function ClubsTab({
  site,
  onSave,
}: {
  site: SiteData
  onSave: (site: SiteData) => Promise<void>
}) {
  const empty = useMemo<SiteClub>(
    () => ({ id: '', name: '', city: '', hall: '', contact: '' }),
    [],
  )
  const [form, setForm] = useState<SiteClub>(empty)

  function submit(event: FormEvent) {
    event.preventDefault()
    const item: SiteClub = { ...form, id: form.id || newId() }
    const clubs = form.id
      ? site.clubs.map((club) => (club.id === form.id ? item : club))
      : [item, ...site.clubs]
    void onSave({ ...site, clubs }).then(() => setForm(empty))
  }

  return (
    <>
      <h1>Клубы</h1>
      <form className="admin-form" onSubmit={submit}>
        <label>
          Название
          <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
        </label>
        <label>
          Город
          <input value={form.city} onChange={(event) => setForm({ ...form, city: event.target.value })} />
        </label>
        <label>
          Зал
          <input value={form.hall} onChange={(event) => setForm({ ...form, hall: event.target.value })} />
        </label>
        <label>
          Контакт
          <input
            value={form.contact}
            onChange={(event) => setForm({ ...form, contact: event.target.value })}
          />
        </label>
        <div className="admin-actions">
          <button className="cta primary" type="submit">
            {form.id ? 'Сохранить' : 'Добавить'}
          </button>
          {form.id ? (
            <button className="cta ghost" type="button" onClick={() => setForm(empty)}>
              Отмена
            </button>
          ) : null}
        </div>
      </form>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Клуб</th>
            <th>Город</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {site.clubs.map((club) => (
            <tr key={club.id}>
              <td>{club.name}</td>
              <td>{club.city}</td>
              <td>
                <button type="button" onClick={() => setForm(club)}>
                  Изменить
                </button>
                <button
                  type="button"
                  onClick={() =>
                    void onSave({
                      ...site,
                      clubs: site.clubs.filter((item) => item.id !== club.id),
                    })
                  }
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
