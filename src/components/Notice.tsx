import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function Notice({ children }: Props) {
  return (
    <p className="notice" role="note">
      {children}
    </p>
  )
}
