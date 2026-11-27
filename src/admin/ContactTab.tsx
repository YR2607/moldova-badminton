import { useState, type FormEvent } from 'react'
import type { ContactPerson, SiteData } from '../data/site'
import { newId } from '../data/site'

type Props = {
  site: SiteData
  onSave: (site: SiteData) => Promise<void>
}

export default function ContactTab({ site, onSave }: Props) {
  const [email, setEmail] = useState(site.contact.email)
  const [phones, setPhones] = useState(
    site.contact.phones.length > 0 ? site.contact.phones : [''],
  )
  const [people, setPeople] = useState<ContactPerson[]>(
    site.contact.people.length > 0 ? site.contact.people : [],
  )
  const [social, setSocial] = useState(site.contact.social)

  function submit(event: FormEvent) {
    event.preventDefault()
    void onSave({
      ...site,
      contact: {
        email: email.trim(),
        phones: phones.map((item) => item.trim()).filter(Boolean),
        people: people
          .map((person) => ({
            ...person,
            name: person.name.trim(),
            phone: person.phone.trim(),
          }))
          .filter((person) => person.name || person.phone),
        social: {
          facebook: social.facebook.trim(),
          instagram: social.instagram.trim(),
          tiktok: social.tiktok.trim(),
          youtube: social.youtube.trim(),
        },
      },
    })
  }

  return (
    <>
      <h1>Контакт</h1>
      <form className="admin-form" onSubmit={submit}>
        <label>
          Почта
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="office@example.md"
          />
        </label>

        <fieldset className="admin-fieldset">
          <legend>Телефоны федерации</legend>
          {phones.map((phone, index) => (
            <div className="admin-row" key={`phone-${index}`}>
              <input
                value={phone}
                onChange={(event) =>
                  setPhones(phones.map((item, i) => (i === index ? event.target.value : item)))
                }
                placeholder="+373 …"
              />
              {phones.length > 1 ? (
                <button
                  type="button"
                  onClick={() => setPhones(phones.filter((_, i) => i !== index))}
                >
                  Убрать
                </button>
              ) : null}
            </div>
          ))}
          <button type="button" onClick={() => setPhones([...phones, ''])}>
            + телефон
          </button>
        </fieldset>

        <fieldset className="admin-fieldset">
          <legend>Имя + телефон (если нужно)</legend>
          {people.map((person, index) => (
            <div className="admin-row admin-row-2" key={person.id}>
              <input
                value={person.name}
                placeholder="Имя"
                onChange={(event) =>
                  setPeople(
                    people.map((item, i) =>
                      i === index ? { ...item, name: event.target.value } : item,
                    ),
                  )
                }
              />
              <input
                value={person.phone}
                placeholder="Телефон"
                onChange={(event) =>
                  setPeople(
                    people.map((item, i) =>
                      i === index ? { ...item, phone: event.target.value } : item,
                    ),
                  )
                }
              />
              <button
                type="button"
                onClick={() => setPeople(people.filter((_, i) => i !== index))}
              >
                Убрать
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setPeople([...people, { id: newId(), name: '', phone: '' }])}
          >
            + человек
          </button>
        </fieldset>

        <label>
          Facebook
          <input
            value={social.facebook}
            onChange={(event) => setSocial({ ...social, facebook: event.target.value })}
            placeholder="https://facebook.com/…"
          />
        </label>
        <label>
          Instagram
          <input
            value={social.instagram}
            onChange={(event) => setSocial({ ...social, instagram: event.target.value })}
            placeholder="https://instagram.com/…"
          />
        </label>
        <label>
          TikTok
          <input
            value={social.tiktok}
            onChange={(event) => setSocial({ ...social, tiktok: event.target.value })}
            placeholder="https://tiktok.com/@…"
          />
        </label>
        <label>
          YouTube
          <input
            value={social.youtube}
            onChange={(event) => setSocial({ ...social, youtube: event.target.value })}
            placeholder="https://youtube.com/…"
          />
        </label>

        <div className="admin-actions">
          <button className="cta primary" type="submit">
            Сохранить
          </button>
        </div>
      </form>
    </>
  )
}
