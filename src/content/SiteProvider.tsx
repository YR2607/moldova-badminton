import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import fallback from '../../data/site.json'
import { adminHeaders } from '../admin/auth'
import { normalizeSite, type SiteData } from '../data/site'
import { SiteContext } from './SiteContext'

const emptySite = normalizeSite(fallback)

export function SiteProvider({ children }: { children: ReactNode }) {
  const [site, setSite] = useState<SiteData>(emptySite)
  const [loading, setLoading] = useState(true)

  const reload = useCallback(async () => {
    try {
      const response = await fetch('/api/site')
      if (!response.ok) throw new Error('fetch failed')
      setSite(normalizeSite(await response.json()))
    } catch {
      setSite(emptySite)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void reload()
  }, [reload])

  const save = useCallback(async (next: SiteData, password: string) => {
    const normalized = normalizeSite(next)
    const response = await fetch('/api/site', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...adminHeaders(),
        'x-admin-password': password,
      },
      body: JSON.stringify(normalized),
    })
    if (!response.ok) {
      throw new Error('save failed')
    }
    setSite(normalized)
  }, [])

  const value = useMemo(
    () => ({ site, loading, reload, save }),
    [site, loading, reload, save],
  )

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>
}
