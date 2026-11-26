export const LOCALES = ['ro', 'ru'] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'ro'

export const LOCALE_STORAGE_KEY = 'mbf-locale'

export function isLocale(value: string | null | undefined): value is Locale {
  return value === 'ro' || value === 'ru'
}
