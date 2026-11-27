import { createContext } from 'react'
import type { SiteData } from '../data/site'

export type SiteContextValue = {
  site: SiteData
  loading: boolean
  reload: () => Promise<void>
  save: (next: SiteData, password: string) => Promise<void>
}

export const SiteContext = createContext<SiteContextValue | null>(null)
