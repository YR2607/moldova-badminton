import { useState, type FormEvent } from 'react'
import type { SiteData, SiteRuleDoc, SiteTournament } from '../data/site'
import { newId, tournamentDates } from '../data/site'
import CalendarTab from './CalendarTab'
import FileField from './FileField'

type Props = {
  site: SiteData
  password: string
  onSave: (site: SiteData) => Promise<void>
}

const SUBS = [
  { id: 'calendar', label: 'Календарь' },
  { id: 'rules', label: 'Регламенты' },
  { id: 'results', label: 'Результаты' },
] as const

type SubId = (typeof SUBS)[number]['id']

export default function CompetitionsTab({ site, password, onSave }: Props) {
  const [sub, setSub] = useState<SubId>('calendar')

  return (
    <>
      <nav className="admin-subnav" aria-label="Соревнования">
        {SUBS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={sub === item.id ? 'active' : undefined}
            onClick={() => setSub(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
      {sub === 'calendar' ? <CalendarTab site={site} password={password} onSave={onSave} /> : null}
      {sub === 'rules' ? <RulesPanel site={site} password={password} onSave={onSave} /> : null}
      {sub === 'results' ? <ResultsPanel site={site} password={password} onSave={onSave} /> : null}
    </>
  )
}

function patchTournament(
  site: SiteData,
  id: string,
  patch: Partial<SiteTournament>,
): SiteData {
  return {
    ...site,
    tournaments: site.tournaments.map((row) => (row.id === id ? { ...row, ...patch } : row)),
  }
}

function RulesPanel({ site, password, onSave }: Props) {
  const empty = (): SiteRuleDoc => ({ id: '', title: { ro: '', ru: '' }, href: '' })
  const [form, setForm] = useState<SiteRuleDoc>(empty)

  function submitGeneral(event: FormEvent) {
    event.preventDefault()
    const item: SiteRuleDoc = {
      ...form,
      id: form.id || newId(),
      href: form.href.trim(),
    }
    const generalRules = form.id
      ? site.generalRules.map((row) => (row.id === form.id ? item : row))
      : [...site.generalRules, item]
    void onSave({ ...site, generalRules }).then(() => setForm(empty()))
  }

  return (
    <>
      <h1>Регламенты</h1>
      <p className="muted">
        Общие документы федерации показываются в разделе «Регламенты». Регламент конкретного
        турнира прикрепляется к событию из календаря — тогда он появится и в списке регламентов, и
        на странице турнира.
      </p>

      <h2 className="admin-sub">Общие регламенты</h2>
      <form className="admin-form" onSubmit={submitGeneral}>
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
        <FileField
          label="PDF или ссылка"
          value={form.href}
          password={password}
          onChange={(href) => setForm({ ...form, href })}
        />
        <div className="admin-actions">
          <button className="cta primary" type="submit">
            {form.id ? 'Сохранить' : 'Добавить'}
          </button>
          {form.id ? (
            <button className="cta ghost" type="button" onClick={() => setForm(empty())}>
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
          {site.generalRules.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.title.ru || doc.title.ro}</td>
              <td>
                <button type="button" onClick={() => setForm(doc)}>
                  Изменить
                </button>
                <button
                  type="button"
                  onClick={() =>
                    void onSave({
                      ...site,
                      generalRules: site.generalRules.filter((item) => item.id !== doc.id),
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

      <h2 className="admin-sub">Регламенты турниров</h2>
      {site.tournaments.length === 0 ? (
        <p className="muted">Сначала добавьте турнир во вкладке «Календарь».</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Турнир</th>
              <th>Регламент</th>
            </tr>
          </thead>
          <tbody>
            {site.tournaments.map((row) => (
              <tr key={row.id}>
                <td>
                  {row.name}
                  <br />
                  <span className="muted">{tournamentDates(row, 'ru')}</span>
                </td>
                <td>
                  <FileField
                    label=""
                    value={row.rulesHref ?? ''}
                    password={password}
                    onChange={(href) =>
                      void onSave(patchTournament(site, row.id, { rulesHref: href || undefined }))
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

function ResultsPanel({ site, password, onSave }: Props) {
  return (
    <>
      <h1>Результаты</h1>
      <p className="muted">
        Результат всегда привязан к турниру из календаря. Добавьте событие, затем прикрепите PDF или
        ссылку на протокол — запись появится в разделе «Результаты» и на странице турнира.
      </p>
      {site.tournaments.length === 0 ? (
        <p className="muted">Сначала добавьте турнир во вкладке «Календарь».</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Турнир</th>
              <th>Результаты</th>
            </tr>
          </thead>
          <tbody>
            {site.tournaments.map((row) => (
              <tr key={row.id}>
                <td>
                  {row.name}
                  <br />
                  <span className="muted">{tournamentDates(row, 'ru')}</span>
                </td>
                <td>
                  <FileField
                    label=""
                    value={row.resultsHref ?? ''}
                    password={password}
                    onChange={(href) =>
                      void onSave(
                        patchTournament(site, row.id, { resultsHref: href || undefined }),
                      )
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}
