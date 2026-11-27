import { useMemo, useState, type FormEvent } from 'react'
import type { SiteData, SiteTeamMember, TeamCategory } from '../data/site'
import { TEAM_CATEGORIES, memberName, newId } from '../data/site'
import MediaField from './MediaField'

const CATEGORY_LABEL: Record<TeamCategory, string> = {
  u13: 'U13',
  u15: 'U15',
  u17: 'U17',
  senior: 'Senior',
}

type Props = {
  site: SiteData
  password: string
  onSave: (site: SiteData) => Promise<void>
}

export default function TeamTab({ site, password, onSave }: Props) {
  const empty = useMemo<SiteTeamMember>(
    () => ({
      id: '',
      category: 'u17',
      lastName: '',
      firstName: '',
      photo: '',
      rank: '',
      coach: '',
      club: '',
    }),
    [],
  )
  const [form, setForm] = useState<SiteTeamMember>(empty)

  function submit(event: FormEvent) {
    event.preventDefault()
    const item: SiteTeamMember = {
      ...form,
      id: form.id || newId(),
      photo: form.photo || undefined,
    }
    const team = form.id
      ? site.team.map((member) => (member.id === form.id ? item : member))
      : [item, ...site.team]
    void onSave({ ...site, team }).then(() => setForm(empty))
  }

  return (
    <>
      <h1>Сборная</h1>
      <form className="admin-form" onSubmit={submit}>
        <label>
          Категория
          <select
            value={form.category}
            onChange={(event) =>
              setForm({ ...form, category: event.target.value as TeamCategory })
            }
          >
            {TEAM_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {CATEGORY_LABEL[category]}
              </option>
            ))}
          </select>
        </label>
        <div className="admin-row admin-row-2">
          <label>
            Фамилия
            <input
              value={form.lastName}
              onChange={(event) => setForm({ ...form, lastName: event.target.value })}
              required
            />
          </label>
          <label>
            Имя
            <input
              value={form.firstName}
              onChange={(event) => setForm({ ...form, firstName: event.target.value })}
              required
            />
          </label>
        </div>
        <MediaField
          label="Фото"
          value={form.photo ?? ''}
          password={password}
          onChange={(photo) => setForm({ ...form, photo })}
        />
        <label>
          Разряд
          <input
            value={form.rank}
            onChange={(event) => setForm({ ...form, rank: event.target.value })}
            placeholder="МС, КМС, I разряд…"
          />
        </label>
        <label>
          Тренер
          <input
            value={form.coach}
            onChange={(event) => setForm({ ...form, coach: event.target.value })}
          />
        </label>
        <label>
          Клуб
          <input
            value={form.club}
            onChange={(event) => setForm({ ...form, club: event.target.value })}
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
            <th>Категория</th>
            <th>Фамилия Имя</th>
            <th>Клуб</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {site.team.map((member) => (
            <tr key={member.id}>
              <td>{CATEGORY_LABEL[member.category]}</td>
              <td>{memberName(member)}</td>
              <td>{member.club}</td>
              <td>
                <button
                  type="button"
                  onClick={() => setForm({ ...member, photo: member.photo ?? '' })}
                >
                  Изменить
                </button>
                <button
                  type="button"
                  onClick={() =>
                    void onSave({
                      ...site,
                      team: site.team.filter((item) => item.id !== member.id),
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
