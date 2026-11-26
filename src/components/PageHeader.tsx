import type { ReactNode } from 'react'

type Props = {
  kicker: string
  title: string
  lede?: string
  meta?: ReactNode
  back?: ReactNode
}

export default function PageHeader({ kicker, title, lede, meta, back }: Props) {
  return (
    <header className="page-header">
      {back ? <div className="page-back">{back}</div> : null}
      <p className="kicker">{kicker}</p>
      <h1>{title}</h1>
      {lede ? <p className="lede">{lede}</p> : null}
      {meta ? <div className="page-meta">{meta}</div> : null}
    </header>
  )
}
