import { useRef } from 'react'

type Props = {
  value: string
  onChange: (html: string) => void
  editorKey: string
  password?: string
}

export default function RichEditor({ value, onChange, editorKey, password }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  function command(name: string, argument?: string) {
    ref.current?.focus()
    document.execCommand(name, false, argument)
    onChange(ref.current?.innerHTML ?? '')
  }

  function insertLink() {
    const href = window.prompt('Ссылка', 'https://')
    if (!href) return
    command('createLink', href)
  }

  async function onFile(file: File) {
    if (!password) return
    const data = await fileToBase64(file)
    const response = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-password': password,
      },
      body: JSON.stringify({ type: file.type, data }),
    })
    const json = (await response.json()) as { url?: string }
    if (!response.ok || !json.url) return
    command('insertImage', json.url)
  }

  return (
    <div className="rich-editor">
      <div className="rich-toolbar" role="toolbar" aria-label="Форматирование">
        <button type="button" onClick={() => command('bold')}>
          Ж
        </button>
        <button type="button" onClick={() => command('italic')}>
          К
        </button>
        <button type="button" onClick={() => command('underline')}>
          Ч
        </button>
        <button type="button" onClick={() => command('formatBlock', 'H2')}>
          H2
        </button>
        <button type="button" onClick={() => command('formatBlock', 'P')}>
          P
        </button>
        <button type="button" onClick={() => command('insertUnorderedList')}>
          Список
        </button>
        <button type="button" onClick={() => command('insertOrderedList')}>
          1.
        </button>
        <button type="button" onClick={() => command('formatBlock', 'BLOCKQUOTE')}>
          Цитата
        </button>
        <button type="button" onClick={insertLink}>
          Ссылка
        </button>
        <button type="button" onClick={() => fileRef.current?.click()}>
          Картинка
        </button>
        <button type="button" onClick={() => command('removeFormat')}>
          Сброс
        </button>
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        hidden
        onChange={(event) => {
          const file = event.target.files?.[0]
          if (file) void onFile(file)
          event.target.value = ''
        }}
      />
      <div
        key={editorKey}
        ref={ref}
        className="rich-surface"
        contentEditable
        suppressContentEditableWarning
        dangerouslySetInnerHTML={{ __html: value }}
        onInput={() => onChange(ref.current?.innerHTML ?? '')}
      />
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
