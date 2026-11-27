import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import type { SiteData, SiteNews } from '../data/site'
import { newId, slugify, todayIso } from '../data/site'
import MediaField from './MediaField'
import RichEditor from './RichEditor'

type Props = {
  site: SiteData
  password: string
  onSave: (site: SiteData) => Promise<void>
}

function emptyNews(): SiteNews {
  return {
    id: '',
    slug: '',
    status: 'draft',
    date: todayIso(),
    title: '',
    excerpt: '',
    body: '',
    image: '',
    sourceUrl: '',
    category: '',
  }
}

export default function NewsTab({ site, password, onSave }: Props) {
  const [form, setForm] = useState<SiteNews>(emptyNews)
  const [editing, setEditing] = useState(false)
  const [slugLocked, setSlugLocked] = useState(false)

  function openNew() {
    setForm(emptyNews())
    setSlugLocked(false)
    setEditing(true)
  }

  function openEdit(item: SiteNews) {
    setForm({
      ...item,
      image: item.image ?? '',
      sourceUrl: item.sourceUrl ?? '',
      category: item.category ?? '',
    })
    setSlugLocked(true)
    setEditing(true)
  }

  function closeEditor() {
    setForm(emptyNews())
    setEditing(false)
    setSlugLocked(false)
  }

  function setTitle(title: string) {
    setForm((current) => ({
      ...current,
      title,
      slug: slugLocked || current.id ? current.slug : slugify(title),
    }))
  }

  function persist(status: SiteNews['status']) {
    const item: SiteNews = {
      ...form,
      id: form.id || newId(),
      status,
      slug: slugify(form.slug || form.title),
      image: form.image || undefined,
      sourceUrl: form.sourceUrl || undefined,
      category: form.category || undefined,
    }
    const news = form.id
      ? site.news.map((entry) => (entry.id === form.id ? item : entry))
      : [item, ...site.news]
    return onSave({ ...site, news }).then(() => {
      setForm({ ...item, image: item.image ?? '', sourceUrl: item.sourceUrl ?? '', category: item.category ?? '' })
      setSlugLocked(true)
    })
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    void persist(form.status || 'published')
  }

  if (!editing) {
    return (
      <>
        <div className="admin-head">
          <h1>Новости</h1>
          <button className="cta primary" type="button" onClick={openNew}>
            Добавить запись
          </button>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Дата</th>
              <th>Заголовок</th>
              <th>Статус</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {site.news.length === 0 ? (
              <tr>
                <td colSpan={4}>Записей пока нет</td>
              </tr>
            ) : (
              site.news.map((item) => (
                <tr key={item.id}>
                  <td>{item.date}</td>
                  <td>{item.title}</td>
                  <td>{item.status === 'draft' ? 'Черновик' : 'Опубликовано'}</td>
                  <td>
                    <button type="button" onClick={() => openEdit(item)}>
                      Изменить
                    </button>
                    {item.status === 'published' ? (
                      <Link to={`/news/${item.slug || item.id}`}>Открыть</Link>
                    ) : null}
                    <button
                      type="button"
                      onClick={() =>
                        void onSave({
                          ...site,
                          news: site.news.filter((entry) => entry.id !== item.id),
                        })
                      }
                    >
                      Удалить
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </>
    )
  }

  return (
    <>
      <div className="admin-head">
        <h1>{form.id ? 'Редактировать запись' : 'Новая запись'}</h1>
        <button className="cta ghost" type="button" onClick={closeEditor}>
          Ко всем записям
        </button>
      </div>
      <form className="wp-layout" onSubmit={submit}>
        <div className="wp-main">
          <label>
            Заголовок
            <input
              className="wp-title"
              value={form.title}
              onChange={(event) => setTitle(event.target.value)}
              required
              placeholder="Заголовок"
            />
          </label>
          <label>
            Постоянная ссылка
            <input
              value={form.slug}
              onChange={(event) => {
                setSlugLocked(true)
                setForm({ ...form, slug: event.target.value })
              }}
              placeholder="slug"
            />
          </label>
          <div>
            <span className="admin-label">Текст</span>
            <RichEditor
              editorKey={form.id || 'new'}
              value={form.body}
              password={password}
              onChange={(body) => setForm({ ...form, body })}
            />
          </div>
          <label>
            Краткое описание (анонс)
            <textarea
              value={form.excerpt}
              onChange={(event) => setForm({ ...form, excerpt: event.target.value })}
            />
          </label>
        </div>
        <aside className="wp-side">
          <div className="wp-box">
            <h2>Публикация</h2>
            <label>
              Статус
              <select
                value={form.status}
                onChange={(event) =>
                  setForm({ ...form, status: event.target.value as SiteNews['status'] })
                }
              >
                <option value="draft">Черновик</option>
                <option value="published">Опубликовано</option>
              </select>
            </label>
            <label>
              Дата
              <input
                type="date"
                value={form.date}
                onChange={(event) => setForm({ ...form, date: event.target.value })}
                required
              />
            </label>
            <div className="admin-actions">
              <button className="cta ghost" type="button" onClick={() => void persist('draft')}>
                В черновик
              </button>
              <button className="cta primary" type="submit">
                {form.status === 'published' || form.id ? 'Сохранить' : 'Опубликовать'}
              </button>
            </div>
          </div>
          <div className="wp-box">
            <h2>Обложка</h2>
            <MediaField
              label="Изображение записи"
              value={form.image ?? ''}
              password={password}
              onChange={(image) => setForm({ ...form, image })}
            />
          </div>
          <div className="wp-box">
            <h2>Свойства</h2>
            <label>
              Рубрика
              <input
                value={form.category ?? ''}
                onChange={(event) => setForm({ ...form, category: event.target.value })}
                placeholder="Турнир, клуб, сборная…"
              />
            </label>
            <label>
              Источник / Facebook
              <input
                value={form.sourceUrl ?? ''}
                onChange={(event) => setForm({ ...form, sourceUrl: event.target.value })}
                placeholder="https://"
              />
            </label>
          </div>
        </aside>
      </form>
    </>
  )
}
