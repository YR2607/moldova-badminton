import type { ReactNode } from 'react'

type Props = {
  title: string
  description?: string
  action?: ReactNode
  children: ReactNode
  className?: string
}

export default function Section({
  title,
  description,
  action,
  children,
  className = '',
}: Props) {
  return (
    <section className={`home-section ${className}`.trim()}>
      <div className="section-inner">
        <div className="section-head">
          <div>
            <h2>{title}</h2>
            {description ? <p>{description}</p> : null}
          </div>
          {action}
        </div>
        {children}
      </div>
    </section>
  )
}
