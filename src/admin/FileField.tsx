import { useState } from 'react'
import { adminHeaders } from './auth'

type Props = {
  label: string
  value: string
  password: string
  onChange: (url: string) => void
}

export default function FileField({ label, value, onChange }: Props) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function upload(file: File) {
    setBusy(true)
    setError('')
    try {
      const type = file.type || (file.name.toLowerCase().endsWith('.pdf') ? 'application/pdf' : '')
      const data = await fileToBase64(file)
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...adminHeaders(),
        },
        body: JSON.stringify({ type, data }),
      })
      const json = (await response.json()) as { url?: string }
      if (!response.ok || !json.url) {
        throw new Error('upload failed')
      }
      onChange(json.url)
    } catch {
      setError('Не удалось загрузить PDF (до 15 МБ)')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="admin-media">
      <span>{label}</span>
      {value ? (
        <a href={value} target="_blank" rel="noreferrer">
          Открыть файл
        </a>
      ) : null}
      <input
        type="file"
        accept="application/pdf,.pdf"
        onChange={(event) => {
          const file = event.target.files?.[0]
          if (file) void upload(file)
          event.target.value = ''
        }}
      />
      <input
        value={value}
        placeholder="или вставьте URL"
        onChange={(event) => onChange(event.target.value)}
      />
      {busy ? <p className="muted">Загрузка…</p> : null}
      {error ? <p className="admin-error">{error}</p> : null}
    </div>
  )
}

function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = String(reader.result ?? '')
      const comma = result.indexOf(',')
      resolve(comma >= 0 ? result.slice(comma + 1) : result)
    }
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}
