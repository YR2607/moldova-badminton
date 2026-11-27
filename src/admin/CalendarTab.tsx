import { useMemo, useState, type FormEvent } from 'react'
import type { SiteData, SiteTournament } from '../data/site'
import { newId, todayIso, tournamentDates } from '../data/site'
import FileField from './FileField'
import MediaField from './MediaField'

type Props = {
  site: SiteData
  password: string
  onSave: (site: SiteData) => Promise<void>
}

export default function CalendarTab({ site, password, onSave }: Props) {
  const empty = useMemo<SiteTournament>(
    () => ({
      id: '',
      name: '',
      dateStart: todayIso(),
      dateEnd: '',
      place: '',
      image: '',
      description: '',
      registrationHref: '',
      contactName: '',
      contactPhone: '',
      rulesHref: '',
      resultsHref: '',
    }),
    [],
  )
  const [form, setForm] = useState<SiteTournament>(empty)

  function submit(event: FormEvent) {
    event.preventDefault()
    const item: SiteTournament = {
      ...form,
      id: form.id || newId(),
      dateEnd: form.dateEnd || form.dateStart,
      image: form.image || undefined,
      registrationHref: form.registrationHref || undefined,
      rulesHref: form.rulesHref || undefined,
      resultsHref: form.resultsHref || undefined,
    }
    const tournaments = form.id
      ? site.tournaments.map((row) => (row.id === form.id ? item : row))
      : [item, ...site.tournaments]
    void onSave({ ...site, tournaments }).then(() => setForm(empty))
  }

  return (
    <>
      <h1>Календарь</h1>
      <form className="admin-form" onSubmit={submit}>
        <label>
          Название
          <input
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            required
          />
        </label>
        <div className="admin-row admin-row-2">
          <label>
            Дата начала
            <input
              type="date"
              value={form.dateStart}
              onChange={(event) => setForm({ ...form, dateStart: event.target.value })}
              required
            />
          </label>
          <label>
            Дата окончания
            <input
              type="date"
              value={form.dateEnd}
              min={form.dateStart}
              onChange={(event) => setForm({ ...form, dateEnd: event.target.value })}
            />
          </label>
        </div>
        <MediaField
          label="Фото"
          value={form.image ?? ''}
          password={password}
          onChange={(image) => setForm({ ...form, image })}
        />
        <label>
          Описание
          <textarea
            value={form.description}
            onChange={(event) => setForm({ ...form, description: event.target.value })}
          />
        </label>
        <label>
          Ссылка на регистрацию
          <input
            value={form.registrationHref ?? ''}
            onChange={(event) => setForm({ ...form, registrationHref: event.target.value })}
            placeholder="https://"
          />
        </label>
        <div className="admin-row admin-row-2">
          <label>
            Контакт — имя
            <input
              value={form.contactName}
              onChange={(event) => setForm({ ...form, contactName: event.target.value })}
            />
          </label>
          <label>
            Контакт — телефон
            <input
              value={form.contactPhone}
              onChange={(event) => setForm({ ...form, contactPhone: event.target.value })}
            />
          </label>
        </div>
        <label>
          Место
          <input
            value={form.place}
            onChange={(event) => setForm({ ...form, place: event.target.value })}
          />
        </label>
        <FileField
          label="Регламент (PDF или ссылка) — появится в разделе «Регламенты»"
          value={form.rulesHref ?? ''}
          password={password}
          onChange={(rulesHref) => setForm({ ...form, rulesHref })}
        />
        <FileField
          label="Результаты (PDF или ссылка) — появятся в разделе «Результаты»"
          value={form.resultsHref ?? ''}
          password={password}
          onChange={(resultsHref) => setForm({ ...form, resultsHref })}
        />
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
            <th>Турнир</th>
            <th>Дата</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {site.tournaments.map((row) => (
            <tr key={row.id}>
              <td>{row.name}</td>
              <td>{tournamentDates(row, 'ru')}</td>
              <td>
                <button
                  type="button"
                  onClick={() =>
                    setForm({
                      ...row,
                      image: row.image ?? '',
                      registrationHref: row.registrationHref ?? '',
                      rulesHref: row.rulesHref ?? '',
                      resultsHref: row.resultsHref ?? '',
                    })
                  }
                >
                  Изменить
                </button>
                <button
                  type="button"
                  onClick={() =>
                    void onSave({
                      ...site,
                      tournaments: site.tournaments.filter((item) => item.id !== row.id),
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
