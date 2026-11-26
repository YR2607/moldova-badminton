import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function PageShell({ children }: Props) {
  return (
    <article className="page-shell">
      <div className="page-shell-inner">{children}</div>
    </article>
  )
}
