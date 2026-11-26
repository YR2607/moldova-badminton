/** Non-localized structural data — strings live in src/i18n/messages.ts */

export type Tournament = {
  id: string
  name: string
  dates: string
  place: string
  rulesHref?: string
  resultsHref?: string
}

/** Empty until federation publishes calendar — do not invent events. */
export const tournaments: Tournament[] = []

export type Club = {
  id: string
  name: string
  city: string
  hall: string
  contact: string
}

/** Empty until federation provides club list. */
export const clubs: Club[] = []

export const contactMeta = {
  email: 'office@example.badminton.md',
  emailIsPlaceholder: true,
  phoneIsPlaceholder: true,
  addressIsPlaceholder: true,
}
