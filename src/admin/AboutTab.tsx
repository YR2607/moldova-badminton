import { useState, type FormEvent } from 'react'
import type { SiteAbout, SiteActivity, SiteData, SiteLeader } from '../data/site'
import { newId } from '../data/site'
import MediaField from './MediaField'

type Props = {
  site: SiteData
  password: string
  onSave: (site: SiteData) => Promise<void>
}

const emptyLeader = (): SiteLeader => ({
  id: '',
  name: '',
  role: { ro: '', ru: '' },
  photo: '',
})

export default function AboutTab({ site, password, onSave }: Props) {
  const [about, setAbout] = useState<SiteAbout>(site.about)
  const [leader, setLeader] = useState<SiteLeader>(emptyLeader)

  function saveAbout(next: SiteAbout) {
    setAbout(next)
    return onSave({ ...site, about: next })
  }

  function submitTexts(event: FormEvent) {
    event.preventDefault()
    void saveAbout(about)
  }

  function addActivity() {
    const item: SiteActivity = { id: newId(), text: { ro: '', ru: '' } }
    setAbout({ ...about, activities: [...about.activities, item] })
  }

  function submitLeader(event: FormEvent) {
    event.preventDefault()
    const item: SiteLeader = {
      ...leader,
      id: leader.id || newId(),
      name: leader.name.trim(),
      photo: leader.photo || undefined,
    }
    const leadership = leader.id
      ? about.leadership.map((entry) => (entry.id === leader.id ? item : entry))
      : [...about.leadership, item]
    void saveAbout({ ...about, leadership }).then(() => setLeader(emptyLeader()))
  }

  return (
    <>
      <h1>О федерации</h1>
      <form className="admin-form" onSubmit={submitTexts}>
        <label>
          Заголовок RO
          <input
            value={about.title.ro}
            onChange={(event) =>
              setAbout({ ...about, title: { ...about.title, ro: event.target.value } })
            }
          />
        </label>
        <label>
          Заголовок RU
          <input
            value={about.title.ru}
            onChange={(event) =>
              setAbout({ ...about, title: { ...about.title, ru: event.target.value } })
            }
          />
        </label>
        <label>
          Кратко RO
          <textarea
            value={about.lede.ro}
            onChange={(event) =>
              setAbout({ ...about, lede: { ...about.lede, ro: event.target.value } })
            }
          />
        </label>
        <label>
          Кратко RU
          <textarea
            value={about.lede.ru}
            onChange={(event) =>
              setAbout({ ...about, lede: { ...about.lede, ru: event.target.value } })
            }
          />
        </label>
        <label>
          Текст страницы RO
          <textarea
            value={about.intro.ro}
            onChange={(event) =>
              setAbout({ ...about, intro: { ...about.intro, ro: event.target.value } })
            }
          />
        </label>
        <label>
          Текст страницы RU
          <textarea
            value={about.intro.ru}
            onChange={(event) =>
              setAbout({ ...about, intro: { ...about.intro, ru: event.target.value } })
            }
          />
        </label>
        <label>
          Заголовок блока «деятельность» RO
          <input
            value={about.activitiesTitle.ro}
            onChange={(event) =>
              setAbout({
                ...about,
                activitiesTitle: { ...about.activitiesTitle, ro: event.target.value },
              })
            }
          />
        </label>
        <label>
          Заголовок блока «деятельность» RU
          <input
            value={about.activitiesTitle.ru}
            onChange={(event) =>
              setAbout({
                ...about,
                activitiesTitle: { ...about.activitiesTitle, ru: event.target.value },
              })
            }
          />
        </label>

        <fieldset className="admin-fieldset">
          <legend>Чем занимаемся</legend>
          {about.activities.map((item, index) => (
            <div className="admin-row admin-row-2" key={item.id}>
              <input
                value={item.text.ro}
                placeholder="RO"
                onChange={(event) =>
                  setAbout({
                    ...about,
                    activities: about.activities.map((row, i) =>
                      i === index
                        ? { ...row, text: { ...row.text, ro: event.target.value } }
                        : row,
                    ),
                  })
                }
              />
              <input
                value={item.text.ru}
                placeholder="RU"
                onChange={(event) =>
                  setAbout({
                    ...about,
                    activities: about.activities.map((row, i) =>
                      i === index
                        ? { ...row, text: { ...row.text, ru: event.target.value } }
                        : row,
                    ),
                  })
                }
              />
              <button
                type="button"
                onClick={() =>
                  setAbout({
                    ...about,
                    activities: about.activities.filter((_, i) => i !== index),
                  })
                }
              >
                Убрать
              </button>
            </div>
          ))}
          <button type="button" onClick={addActivity}>
            + пункт
          </button>
        </fieldset>

        <label>
          Заголовок «руководство» RO
          <input
            value={about.leadershipTitle.ro}
            onChange={(event) =>
              setAbout({
                ...about,
                leadershipTitle: { ...about.leadershipTitle, ro: event.target.value },
              })
            }
          />
        </label>
        <label>
          Заголовок «руководство» RU
          <input
            value={about.leadershipTitle.ru}
            onChange={(event) =>
              setAbout({
                ...about,
                leadershipTitle: { ...about.leadershipTitle, ru: event.target.value },
              })
            }
          />
        </label>
        <div className="admin-actions">
          <button className="cta primary" type="submit">
            Сохранить тексты
          </button>
        </div>
      </form>

      <h2 className="admin-sub">Руководство</h2>
      <form className="admin-form" onSubmit={submitLeader}>
        <label>
          Имя
          <input
            value={leader.name}
            onChange={(event) => setLeader({ ...leader, name: event.target.value })}
            required
          />
        </label>
        <label>
          Должность RO
          <input
            value={leader.role.ro}
            onChange={(event) =>
              setLeader({ ...leader, role: { ...leader.role, ro: event.target.value } })
            }
          />
        </label>
        <label>
          Должность RU
          <input
            value={leader.role.ru}
            onChange={(event) =>
              setLeader({ ...leader, role: { ...leader.role, ru: event.target.value } })
            }
          />
        </label>
        <MediaField
          label="Фото"
          value={leader.photo ?? ''}
          password={password}
          onChange={(photo) => setLeader({ ...leader, photo })}
        />
        <div className="admin-actions">
          <button className="cta primary" type="submit">
            {leader.id ? 'Сохранить' : 'Добавить'}
          </button>
          {leader.id ? (
            <button className="cta ghost" type="button" onClick={() => setLeader(emptyLeader())}>
              Отмена
            </button>
          ) : null}
        </div>
      </form>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Имя</th>
            <th>Должность</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {about.leadership.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.role.ru || item.role.ro}</td>
              <td>
                <button type="button" onClick={() => setLeader({ ...item, photo: item.photo ?? '' })}>
                  Изменить
                </button>
                <button
                  type="button"
                  onClick={() =>
                    void saveAbout({
                      ...about,
                      leadership: about.leadership.filter((entry) => entry.id !== item.id),
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
