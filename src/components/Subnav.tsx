import type { ReactNode } from 'react'

type Props = {
  label: string
  children: ReactNode
}

export default function Subnav({ label, children }: Props) {
  return (
    <nav className="subnav" aria-label={label}>
      {children}
    </nav>
  )
}
