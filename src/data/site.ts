export type Localized = { ro: string; ru: string }

export type ContactPerson = {
  id: string
  name: string
  phone: string
}

export type SiteSocial = {
  facebook: string
  instagram: string
  tiktok: string
  youtube: string
}

export type SiteContact = {
  email: string
  phones: string[]
  people: ContactPerson[]
  social: SiteSocial
}

export type SiteDocument = {
  id: string
  href: string
  title: Localized
  citation: Localized
}

export type NewsStatus = 'draft' | 'published'

export type SiteNews = {
  id: string
  slug: string
  status: NewsStatus
  date: string
  title: string
  excerpt: string
  body: string
  image?: string
  sourceUrl?: string
  category?: string
}

export type SiteClub = {
  id: string
  name: string
  city: string
  hall: string
  contact: string
}

export type SiteTournament = {
  id: string
  name: string
  dateStart: string
  dateEnd: string
  place: string
  image?: string
  description: string
  registrationHref?: string
  contactName: string
  contactPhone: string
  rulesHref?: string
  resultsHref?: string
}

export const TEAM_CATEGORIES = ['u13', 'u15', 'u17', 'senior'] as const

export type TeamCategory = (typeof TEAM_CATEGORIES)[number]

export type SiteTeamMember = {
  id: string
  category: TeamCategory
  lastName: string
  firstName: string
  photo?: string
  rank: string
  coach: string
  club: string
}

export type SiteActivity = {
  id: string
  text: Localized
}

export type SiteLeader = {
  id: string
  name: string
  role: Localized
  photo?: string
}

export type SiteAbout = {
  title: Localized
  lede: Localized
  intro: Localized
  activitiesTitle: Localized
  activities: SiteActivity[]
  leadershipTitle: Localized
  leadership: SiteLeader[]
}

export type SiteRuleDoc = {
  id: string
  title: Localized
  href: string
}

export type SiteData = {
  contact: SiteContact
  about: SiteAbout
  documents: SiteDocument[]
  news: SiteNews[]
  clubs: SiteClub[]
  tournaments: SiteTournament[]
  generalRules: SiteRuleDoc[]
  team: SiteTeamMember[]
}

const emptySocial = (): SiteSocial => ({
  facebook: '',
  instagram: '',
  tiktok: '',
  youtube: '',
})

const emptyLocalized = (): Localized => ({ ro: '', ru: '' })

export function defaultAbout(): SiteAbout {
  return {
    title: { ro: 'Cine suntem', ru: 'Кто мы' },
    lede: {
      ro: 'Moldavian Badminton Federation — organizația națională care dezvoltă badmintonul în țară.',
      ru: 'Moldavian Badminton Federation — национальная организация, развивающая бадминтон в Республике Молдова.',
    },
    intro: {
      ro: 'Reunim cluburi și sportivi, organizăm competiții naționale și reprezentăm Moldova în structurile internaționale.\n\nMembră Badminton World Federation (BWF) și Badminton Europe (BEC).',
      ru: 'Мы объединяем клубы и спортсменов, проводим национальные соревнования и представляем Молдову в международных структурах.\n\nЧлен Badminton World Federation (BWF) и Badminton Europe (BEC).',
    },
    activitiesTitle: { ro: 'Cu ce ne ocupăm', ru: 'Чем занимаемся' },
    activities: [
      {
        id: 'calendar',
        text: {
          ro: 'Calendarul turneelor naționale și al categoriilor de vârstă',
          ru: 'Календарь национальных турниров и возрастных категорий',
        },
      },
      {
        id: 'clubs',
        text: {
          ro: 'Sprijin pentru cluburi și dezvoltarea badmintonului de masă',
          ru: 'Поддержка клубов и развитие массового бадминтона',
        },
      },
      {
        id: 'partners',
        text: {
          ro: 'Legătura cu BWF / Badminton Europe și partenerii',
          ru: 'Связь с BWF / Badminton Europe и партнёрами',
        },
      },
      {
        id: 'info',
        text: {
          ro: 'Informații pentru sportivi, antrenori și arbitri',
          ru: 'Информация для спортсменов, тренеров и судей',
        },
      },
    ],
    leadershipTitle: { ro: 'Conducere', ru: 'Руководство' },
    leadership: [],
  }
}

export function newId() {
  return crypto.randomUUID()
}

export function slugify(text: string) {
  const slug = text
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
  return slug || newId()
}

export function formatPhone(phone: string) {
  const digits = phone.replace(/\D/g, '')
  if (digits.startsWith('373') && digits.length === 11) {
    return `+373 ${digits.slice(3, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`
  }
  if (phone.startsWith('+')) return phone
  return digits ? `+${digits}` : phone
}

export function formatPostDate(isoDate: string, locale: 'ro' | 'ru') {
  if (!isoDate) return ''
  const date = new Date(`${isoDate.slice(0, 10)}T12:00:00`)
  if (Number.isNaN(date.getTime())) return isoDate
  return new Intl.DateTimeFormat(locale === 'ro' ? 'ro-MD' : 'ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export function formatDateRange(start: string, end: string, locale: 'ro' | 'ru') {
  if (!start) return formatPostDate(end, locale)
  if (!end || end === start) return formatPostDate(start, locale)
  return `${formatPostDate(start, locale)} – ${formatPostDate(end, locale)}`
}

export function tournamentDates(row: SiteTournament, locale: 'ro' | 'ru') {
  return formatDateRange(row.dateStart, row.dateEnd, locale)
}

export function sanitizeHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '')
    .replace(/\son\w+="[^"]*"/gi, '')
    .replace(/\son\w+='[^']*'/gi, '')
    .replace(/javascript:/gi, '')
}

export function isHtml(value: string) {
  return /<\/?[a-z][\s\S]*>/i.test(value)
}

export function newsParagraphs(body: string) {
  return body
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean)
}

export function publishedNews(news: SiteNews[]) {
  return news
    .filter((item) => item.status !== 'draft')
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function upcomingTournaments(rows: SiteTournament[]) {
  return rows.slice().sort((a, b) => (a.dateStart || '').localeCompare(b.dateStart || ''))
}

export function isTeamCategory(value: string): value is TeamCategory {
  return (TEAM_CATEGORIES as readonly string[]).includes(value)
}

export function memberName(member: SiteTeamMember) {
  return `${member.lastName} ${member.firstName}`.trim()
}

export function teamGroups(team: SiteTeamMember[]) {
  return TEAM_CATEGORIES.map((category) => ({
    category,
    members: team.filter((member) => member.category === category),
  })).filter((group) => group.members.length > 0)
}

export function primaryPhone(contact: SiteContact) {
  return contact.phones[0] || contact.people[0]?.phone || ''
}

export function primaryPerson(contact: SiteContact) {
  return contact.people[0]
}

export function socialEntries(social: SiteSocial) {
  return (
    [
      { key: 'facebook', href: social.facebook, label: 'Facebook' },
      { key: 'instagram', href: social.instagram, label: 'Instagram' },
      { key: 'tiktok', href: social.tiktok, label: 'TikTok' },
      { key: 'youtube', href: social.youtube, label: 'YouTube' },
    ] as const
  ).filter((item) => item.href)
}

export function findNews(news: SiteNews[], slug: string | undefined) {
  if (!slug) return undefined
  return news.find((item) => item.slug === slug || item.id === slug)
}

export function todayIso() {
  return new Date().toISOString().slice(0, 10)
}

type LooseRecord = Record<string, unknown>

function asString(value: unknown) {
  return typeof value === 'string' ? value : ''
}

function asArray(value: unknown) {
  return Array.isArray(value) ? value : []
}

function asLocalized(value: unknown, fallback: Localized = emptyLocalized()): Localized {
  if (value && typeof value === 'object') {
    const item = value as LooseRecord
    return {
      ro: asString(item.ro) || fallback.ro,
      ru: asString(item.ru) || fallback.ru,
    }
  }
  if (typeof value === 'string' && value) {
    return { ro: value, ru: value }
  }
  return { ...fallback }
}

export function normalizeSite(raw: unknown): SiteData {
  const data = (raw && typeof raw === 'object' ? raw : {}) as LooseRecord
  const contactRaw = (data.contact && typeof data.contact === 'object' ? data.contact : {}) as LooseRecord
  const facebookRaw = (data.facebook && typeof data.facebook === 'object' ? data.facebook : {}) as LooseRecord
  const socialRaw = (contactRaw.social && typeof contactRaw.social === 'object' ? contactRaw.social : {}) as LooseRecord
  const peopleRaw = asArray(contactRaw.people)

  const people: ContactPerson[] =
    peopleRaw.length > 0
      ? peopleRaw.map((entry) => {
          const person = (entry && typeof entry === 'object' ? entry : {}) as LooseRecord
          return {
            id: asString(person.id) || newId(),
            name: asString(person.name),
            phone: asString(person.phone),
          }
        })
      : asString(contactRaw.name)
        ? [
            {
              id: 'primary',
              name: asString(contactRaw.name),
              phone: asString(contactRaw.phone),
            },
          ]
        : []

  const phones = asArray(contactRaw.phones)
    .map(asString)
    .filter(Boolean)
  const singlePhone = asString(contactRaw.phone)
  const aboutRaw = (data.about && typeof data.about === 'object' ? data.about : {}) as LooseRecord
  const defaults = defaultAbout()

  return {
    about: {
      title: asLocalized(aboutRaw.title, defaults.title),
      lede: asLocalized(aboutRaw.lede, defaults.lede),
      intro: asLocalized(aboutRaw.intro, defaults.intro),
      activitiesTitle: asLocalized(aboutRaw.activitiesTitle, defaults.activitiesTitle),
      activities: (() => {
        const rows = asArray(aboutRaw.activities)
        if (rows.length === 0) return defaults.activities
        return rows.map((entry) => {
          const item = (entry && typeof entry === 'object' ? entry : {}) as LooseRecord
          return {
            id: asString(item.id) || newId(),
            text: asLocalized(item.text ?? item),
          }
        })
      })(),
      leadershipTitle: asLocalized(aboutRaw.leadershipTitle, defaults.leadershipTitle),
      leadership: asArray(aboutRaw.leadership).map((entry) => {
        const item = (entry && typeof entry === 'object' ? entry : {}) as LooseRecord
        return {
          id: asString(item.id) || newId(),
          name: asString(item.name),
          role: asLocalized(item.role),
          photo: asString(item.photo) || undefined,
        }
      }),
    },
    contact: {
      email: asString(contactRaw.email),
      phones: phones.length > 0 ? phones : singlePhone ? [singlePhone] : [],
      people,
      social: {
        ...emptySocial(),
        facebook: asString(socialRaw.facebook) || asString(facebookRaw.href),
        instagram: asString(socialRaw.instagram),
        tiktok: asString(socialRaw.tiktok),
        youtube: asString(socialRaw.youtube),
      },
    },
    documents: asArray(data.documents) as SiteDocument[],
    news: asArray(data.news).map((entry) => {
      const item = (entry && typeof entry === 'object' ? entry : {}) as LooseRecord
      const title = asString(item.title)
      return {
        id: asString(item.id) || newId(),
        slug: asString(item.slug) || slugify(title) || asString(item.id),
        status: item.status === 'draft' ? 'draft' : 'published',
        date: asString(item.date),
        title,
        excerpt: asString(item.excerpt),
        body: asString(item.body),
        image: asString(item.image) || undefined,
        sourceUrl: asString(item.sourceUrl) || asString(item.facebookUrl) || undefined,
        category: asString(item.category) || undefined,
      }
    }),
    clubs: asArray(data.clubs) as SiteClub[],
    generalRules: asArray(data.generalRules).map((entry) => {
      const item = (entry && typeof entry === 'object' ? entry : {}) as LooseRecord
      return {
        id: asString(item.id) || newId(),
        title: asLocalized(item.title),
        href: asString(item.href),
      }
    }),
    tournaments: asArray(data.tournaments).map((entry) => {
      const item = (entry && typeof entry === 'object' ? entry : {}) as LooseRecord
      const dates = asString(item.dates)
      return {
        id: asString(item.id) || newId(),
        name: asString(item.name),
        dateStart: asString(item.dateStart) || dates,
        dateEnd: asString(item.dateEnd) || asString(item.dateStart) || dates,
        place: asString(item.place),
        image: asString(item.image) || undefined,
        description: asString(item.description),
        registrationHref: asString(item.registrationHref) || undefined,
        contactName: asString(item.contactName),
        contactPhone: asString(item.contactPhone),
        rulesHref: asString(item.rulesHref) || undefined,
        resultsHref: asString(item.resultsHref) || undefined,
      }
    }),
    team: asArray(data.team).map((entry) => {
      const item = (entry && typeof entry === 'object' ? entry : {}) as LooseRecord
      const fullName = asString(item.name)
      const [legacyLast, ...legacyRest] = fullName.split(/\s+/).filter(Boolean)
      const categoryRaw = asString(item.category).toLowerCase()
      return {
        id: asString(item.id) || newId(),
        category: isTeamCategory(categoryRaw) ? categoryRaw : 'senior',
        lastName: asString(item.lastName) || legacyLast || '',
        firstName: asString(item.firstName) || legacyRest.join(' '),
        photo: asString(item.photo) || undefined,
        rank: asString(item.rank) || asString(item.role),
        coach: asString(item.coach),
        club: asString(item.club),
      }
    }),
  }
}
