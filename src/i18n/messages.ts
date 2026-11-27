import type { Locale } from './locale'

export type MembershipStep = {
  n: string
  title: string
  text: string
}

export type Messages = {
  meta: {
    title: string
    description: string
  }
  brand: {
    line1: string
    line2: string
    full: string
    abbr: string
  }
  a11y: {
    skip: string
    mainNav: string
    mobileNav: string
    partners: string
    openMenu: string
    closeMenu: string
    langSwitch: string
  }
  nav: {
    home: string
    about: string
    competitions: string
    news: string
    clubs: string
    team: string
    contact: string
    documents: string
    calendar: string
    rules: string
    results: string
  }
  footer: {
    federation: string
    sections: string
    partners: string
    blurb: string
    partnersNote: string
    noc: string
    dataNote: string
  }
  common: {
    waitingNote: string
    draftChip: string
    photoLater: string
    membership: string
    foundedNote: string
  }
  home: {
    headline: string
    headlineEm: string
    lede: string
    ctaContact: string
    ctaCalendar: string
    upcomingTitle: string
    upcomingDesc: string
    upcomingLink: string
    calendarEmptyTitle: string
    calendarEmptyBody: string
    newsTitle: string
    newsDesc: string
    newsLink: string
    memberTitle: string
    memberDesc: string
    stepLabel: string
    clubsLink: string
  }
  about: {
    kicker: string
    title: string
    lede: string
    notice: string
    p1: string
    activitiesTitle: string
    activities: string[]
    leadershipTitle: string
    leadershipBody: string
    docsTitle: string
    docsBodyBefore: string
    docsLink: string
  }
  documents: {
    kicker: string
    title: string
    lede: string
    open: string
  }
  competitions: {
    kicker: string
    calendarTitle: string
    calendarLede: string
    rulesTitle: string
    rulesLede: string
    resultsTitle: string
    resultsLede: string
    subnavLabel: string
    calendarNotice: string
    emptyTitle: string
    emptyBody: string
    tableCaption: string
    colName: string
    colDates: string
    colPlace: string
    colRules: string
    colResults: string
    register: string
    contacts: string
    back: string
    rulesNotice: string
    rulesEmptyTitle: string
    rulesEmptyBody: string
    generalRules: string
    tournamentRules: string
    resultsNotice: string
    resultsEmptyTitle: string
    resultsEmptyBody: string
  }
  news: {
    kicker: string
    listTitle: string
    listLede: string
    notice: string
    back: string
    source: string
    emptyTitle: string
    emptyBody: string
    openFacebook: string
    onFacebook: string
    sourceLink: string
  }
  clubs: {
    kicker: string
    title: string
    lede: string
    emptyTitle: string
    emptyBody: string
  }
  team: {
    kicker: string
    title: string
    lede: string
    intro: string
    emptyTitle: string
    emptyBody: string
    rank: string
    coach: string
    club: string
    categories: {
      u13: string
      u15: string
      u17: string
      senior: string
    }
  }
  contact: {
    kicker: string
    title: string
    lede: string
    name: string
    phone: string
    email: string
    social: string
  }
  membershipSteps: MembershipStep[]
}

const ro: Messages = {
  meta: {
    title: 'Moldavian Badminton Federation',
    description:
      'Moldavian Badminton Federation — site oficial. Competiții, cluburi, dezvoltarea sportului.',
  },
  brand: {
    line1: 'Moldavian Badminton',
    line2: 'Federation',
    full: 'Moldavian Badminton Federation',
    abbr: 'MBF',
  },
  a11y: {
    skip: 'Sari la conținut',
    mainNav: 'Navigare principală',
    mobileNav: 'Meniu mobil',
    partners: 'Locuri pentru logo-uri parteneri',
    openMenu: 'Deschide meniul',
    closeMenu: 'Închide meniul',
    langSwitch: 'Limbă interfață',
  },
  nav: {
    home: 'Acasă',
    about: 'Despre federație',
    competitions: 'Competiții',
    news: 'Știri',
    clubs: 'Cluburi',
    team: 'Lot național',
    contact: 'Contact',
    documents: 'Documente oficiale',
    calendar: 'Calendar',
    rules: 'Regulamente',
    results: 'Rezultate',
  },
  footer: {
    federation: 'Federație',
    sections: 'Secțiuni',
    partners: 'Parteneri',
    blurb:
      'Moldavian Badminton Federation (MBF) — organizație națională, membră BWF și Badminton Europe.',
    partnersNote: 'Logo-urile vor apărea după acord.',
    noc: 'COC',
    dataNote: 'Datele oficiale vor fi publicate de federație.',
  },
  common: {
    waitingNote:
      'Datele oficiale (calendar, cluburi, conducere) vor apărea după publicarea de către federație.',
    draftChip: 'Structură',
    photoLater: 'Imagine',
    membership: 'Membră Badminton World Federation (BWF) și Badminton Europe (BEC).',
    foundedNote:
      'Conform anuarelor publice BEC, federația a fost fondată în 1992 și este membră BEC din 1995 — cifrele necesită confirmarea federației.',
  },
  home: {
    headline: 'Competiții, cluburi',
    headlineEm: ' și lot național',
    lede: 'Informații oficiale pentru sportivi, cluburi și părinți din Republica Moldova.',
    ctaContact: 'Contactează federația',
    ctaCalendar: 'Calendar competiții',
    upcomingTitle: 'Competiții apropiate',
    upcomingDesc: 'Calendarul se va completa după aprobarea datelor oficiale de către federație.',
    upcomingLink: 'Tot calendarul',
    calendarEmptyTitle: 'Calendarul este încă gol',
    calendarEmptyBody:
      'Turneele, regulamentele și rezultatele vor apărea aici. Secțiunea este pregătită pentru publicare.',
    newsTitle: 'Știri',
    newsDesc: 'Postări publice de pe facebook.com/mbf.md.',
    newsLink: 'Toate știrile',
    memberTitle: 'Cum devii membru',
    memberDesc: 'Trei pași până la înregistrarea oficială.',
    stepLabel: 'Pas',
    clubsLink: 'Vezi cluburile',
  },
  about: {
    kicker: 'Despre federație',
    title: 'Cine suntem',
    lede: 'Moldavian Badminton Federation — organizația națională care dezvoltă badmintonul în țară.',
    notice: 'Formulările acestei pagini sunt un draft de lucru.',
    p1: 'Reunim cluburi și sportivi, organizăm competiții naționale și reprezentăm Moldova în structurile internaționale.',
    activitiesTitle: 'Cu ce ne ocupăm',
    activities: [
      'Calendarul turneelor naționale și al categoriilor de vârstă',
      'Sprijin pentru cluburi și dezvoltarea badmintonului de masă',
      'Legătura cu BWF / Badminton Europe și partenerii',
      'Informații pentru sportivi, antrenori și arbitri',
    ],
    leadershipTitle: 'Conducere',
    leadershipBody:
      'Numele și funcțiile oficialilor vor apărea după confirmarea federației. Nu publicăm conducerea fără acord scris.',
    docsTitle: 'Documente',
    docsBodyBefore: 'Actele oficiale — în secțiunea Documente oficiale.',
    docsLink: 'Mergi la documente',
  },
  documents: {
    kicker: 'Federație',
    title: 'Documente oficiale',
    lede: 'Acte din registrul legis.md și alte documente publice ale federației.',
    open: 'Deschide',
  },
  competitions: {
    kicker: 'Competiții',
    calendarTitle: 'Calendar',
    calendarLede:
      'Turnee naționale cu ciclu complet: regulament, pagină și rezultate — pe măsură ce sunt publicate.',
    rulesTitle: 'Regulamente',
    rulesLede: 'Regulamente și dispoziții de turneu pentru descărcare.',
    resultsTitle: 'Rezultate',
    resultsLede: 'Rezultatele competițiilor naționale și linkuri către protocoale.',
    subnavLabel: 'Secțiunea competiții',
    calendarNotice:
      'Datele și denumirile turneelor nu sunt inventate. Tabelul este pregătit pentru calendarul oficial.',
    emptyTitle: 'Niciun turneu publicat',
    emptyBody:
      'Când federația aprobă sezonul, aici va apărea un tabel cu date, săli și linkuri către regulamente și rezultate.',
    tableCaption: 'Calendarul competițiilor',
    colName: 'Competiție',
    colDates: 'Date',
    colPlace: 'Loc',
    colRules: 'Regulament',
    colResults: 'Rezultate',
    register: 'Înregistrare',
    contacts: 'Contact',
    back: '← Calendar',
    rulesNotice: 'Fișierele vor apărea odată cu calendarul oficial al sezonului.',
    rulesEmptyTitle: 'Regulamentele nu sunt încă publicate',
    rulesEmptyBody:
      'Aici vor fi PDF-urile regulamentelor pe turneu și regulile generale de organizare.',
    generalRules: 'Regulamente generale',
    tournamentRules: 'Regulamente de turneu',
    resultsNotice: 'Rezultatele se publică doar după confirmarea oficială.',
    resultsEmptyTitle: 'Nu există încă rezultate',
    resultsEmptyBody:
      'După încheierea turneelor aici vor apărea linkuri către protocoale și tabele rezumative.',
  },
  news: {
    kicker: 'Știri',
    listTitle: 'Flux',
    listLede: 'Postări publice de pe pagina Facebook a federației, în stilul site-ului.',
    notice:
      'Până la un canal nou, arhiva se completează din facebook.com/mbf.md. Importul automat nu este disponibil fără acces de administrator.',
    back: '← Toate știrile',
    source: 'Facebook',
    emptyTitle: 'Arhiva este încă goală',
    emptyBody:
      'Deschideți pagina Facebook și trimiteți textul sau capturile postărilor. Le publicăm aici cu link către original.',
    openFacebook: 'Deschide pagina Facebook',
    onFacebook: 'Vezi pe Facebook',
    sourceLink: 'Sursa',
  },
  clubs: {
    kicker: 'Cluburi',
    title: 'Unde joci',
    lede: 'Cluburi afiliate cu oraș, sală și contact — după primirea listei de la federație.',
    emptyTitle: 'Lista cluburilor este încă goală',
    emptyBody:
      'Structura e gata: denumire, oraș, sală și contact. Datele vor apărea după publicarea oficială.',
  },
  team: {
    kicker: 'Lot național',
    title: 'Lotul național',
    lede: 'Componența, staff-ul tehnic și criteriile de selecție — în publicarea oficială a federației.',
    intro:
      'Componența lotului național se publică doar după aprobarea oficială a federației.',
    emptyTitle: 'Componența nu este publicată',
    emptyBody:
      'Nu indicăm încă numele sportivilor și antrenorilor. Secțiunea este rezervată grupelor de vârstă și criteriilor de selecție.',
    rank: 'Clasificare',
    coach: 'Antrenor',
    club: 'Club',
    categories: {
      u13: 'U13',
      u15: 'U15',
      u17: 'U17',
      senior: 'Senior',
    },
  },
  contact: {
    kicker: 'Contact',
    title: 'Contactează federația',
    lede: 'Persoana de contact a federației.',
    name: 'Nume',
    phone: 'Telefon',
    email: 'E-mail',
    social: 'Rețele',
  },
  membershipSteps: [
    {
      n: '01',
      title: 'Contactează federația sau un club',
      text: 'Află ordinea actuală a afilierii și categoriile de vârstă de la federație sau de la un club afiliat.',
    },
    {
      n: '02',
      title: 'Completează documentele',
      text: 'După publicarea formularelor tip pe site, înscrierile și cotizațiile vor urma regulamentul oficial.',
    },
    {
      n: '03',
      title: 'Obține înregistrarea',
      text: 'Statutul de membru și accesul la competiții sunt confirmate de federație.',
    },
  ],
}

const ru: Messages = {
  meta: {
    title: 'Moldavian Badminton Federation',
    description:
      'Moldavian Badminton Federation — официальный сайт. Соревнования, клубы, развитие спорта.',
  },
  brand: {
    line1: 'Moldavian Badminton',
    line2: 'Federation',
    full: 'Moldavian Badminton Federation',
    abbr: 'MBF',
  },
  a11y: {
    skip: 'Перейти к содержимому',
    mainNav: 'Основная навигация',
    mobileNav: 'Мобильное меню',
    partners: 'Слоты логотипов партнёров',
    openMenu: 'Открыть меню',
    closeMenu: 'Закрыть меню',
    langSwitch: 'Язык интерфейса',
  },
  nav: {
    home: 'Главная',
    about: 'О федерации',
    competitions: 'Соревнования',
    news: 'Новости',
    clubs: 'Клубы',
    team: 'Сборная',
    contact: 'Контакты',
    documents: 'Официальные документы',
    calendar: 'Календарь',
    rules: 'Регламенты',
    results: 'Результаты',
  },
  footer: {
    federation: 'Федерация',
    sections: 'Разделы',
    partners: 'Партнёры',
    blurb:
      'Moldavian Badminton Federation (MBF) — национальная организация, член BWF и Badminton Europe.',
    partnersNote: 'Логотипы появятся после согласования.',
    noc: 'НОК',
    dataNote: 'Официальные данные будут опубликованы федерацией.',
  },
  common: {
    waitingNote:
      'Официальные данные (календарь, клубы, руководство) появятся после публикации федерацией.',
    draftChip: 'Структура',
    photoLater: 'Изображение',
    membership: 'Член Badminton World Federation (BWF) и Badminton Europe (BEC).',
    foundedNote:
      'По публичным справочникам BEC федерация основана в 1992 году и входит в BEC с 1995 года — цифры требуют подтверждения федерацией.',
  },
  home: {
    headline: 'Соревнования, клубы',
    headlineEm: ' и сборная',
    lede: 'Официальная информация для спортсменов, клубов и родителей в Республике Молдова.',
    ctaContact: 'Связаться с федерацией',
    ctaCalendar: 'Календарь соревнований',
    upcomingTitle: 'Ближайшие соревнования',
    upcomingDesc: 'Календарь заполнится после утверждения официальных дат федерацией.',
    upcomingLink: 'Весь календарь',
    calendarEmptyTitle: 'Календарь пока пуст',
    calendarEmptyBody:
      'Турниры, регламенты и результаты появятся здесь. Раздел уже готов к публикации.',
    newsTitle: 'Новости',
    newsDesc: 'Публичные посты с facebook.com/mbf.md.',
    newsLink: 'Все новости',
    memberTitle: 'Как стать членом',
    memberDesc: 'Три шага до официальной регистрации.',
    stepLabel: 'Шаг',
    clubsLink: 'Смотреть клубы',
  },
  about: {
    kicker: 'О федерации',
    title: 'Кто мы',
    lede: 'Moldavian Badminton Federation — национальная организация, развивающая бадминтон в Республике Молдова.',
    notice: 'Формулировки этой страницы — рабочий макет.',
    p1: 'Мы объединяем клубы и спортсменов, проводим национальные соревнования и представляем Молдову в международных структурах.',
    activitiesTitle: 'Чем занимаемся',
    activities: [
      'Календарь национальных турниров и возрастных категорий',
      'Поддержка клубов и развитие массового бадминтона',
      'Связь с BWF / Badminton Europe и партнёрами',
      'Информация для спортсменов, тренеров и судей',
    ],
    leadershipTitle: 'Руководство',
    leadershipBody:
      'Имена и должности официальных лиц появятся после подтверждения федерацией. На сайте состав руководства не публикуем без письменного ОК.',
    docsTitle: 'Документы',
    docsBodyBefore: 'Официальные акты — в разделе «Официальные документы».',
    docsLink: 'Перейти к документам',
  },
  documents: {
    kicker: 'Федерация',
    title: 'Официальные документы',
    lede: 'Акты из реестра legis.md и другие публичные документы федерации.',
    open: 'Открыть',
  },
  competitions: {
    kicker: 'Соревнования',
    calendarTitle: 'Календарь',
    calendarLede:
      'Национальные турниры с полным циклом: регламент, страница и результаты — по мере публикации.',
    rulesTitle: 'Регламенты',
    rulesLede: 'Положения и регламенты турниров для скачивания.',
    resultsTitle: 'Результаты',
    resultsLede: 'Итоги национальных соревнований и ссылки на протоколы.',
    subnavLabel: 'Раздел соревнований',
    calendarNotice:
      'Даты и названия турниров не выдуманы. Таблица готова к заполнению официальным календарём.',
    emptyTitle: 'Нет опубликованных турниров',
    emptyBody:
      'Когда федерация утвердит сезон, здесь появится таблица с датами, площадками и ссылками на регламенты и результаты.',
    tableCaption: 'Календарь соревнований',
    colName: 'Соревнование',
    colDates: 'Даты',
    colPlace: 'Место',
    colRules: 'Регламент',
    colResults: 'Результаты',
    register: 'Регистрация',
    contacts: 'Контакт',
    back: '← Календарь',
    rulesNotice: 'Файлы появятся вместе с официальным календарём сезона.',
    rulesEmptyTitle: 'Регламенты ещё не опубликованы',
    rulesEmptyBody:
      'Здесь будут PDF положений по каждому турниру и общие правила организации соревнований.',
    generalRules: 'Общие регламенты',
    tournamentRules: 'Регламенты турниров',
    resultsNotice: 'Результаты публикуются только после официального подтверждения.',
    resultsEmptyTitle: 'Результатов пока нет',
    resultsEmptyBody:
      'После завершения турниров здесь появятся ссылки на протоколы и сводные таблицы.',
  },
  news: {
    kicker: 'Новости',
    listTitle: 'Лента',
    listLede: 'Публичные посты со страницы Facebook федерации, в оформлении сайта.',
    notice:
      'Пока нет нового канала, архив заполняется с facebook.com/mbf.md. Автоимпорт недоступен без прав администратора.',
    back: '← Все новости',
    source: 'Facebook',
    emptyTitle: 'Архив пока пуст',
    emptyBody:
      'Откройте страницу Facebook и пришлите текст или скриншоты постов. Опубликуем их здесь со ссылкой на оригинал.',
    openFacebook: 'Открыть страницу Facebook',
    onFacebook: 'Смотреть в Facebook',
    sourceLink: 'Источник',
  },
  clubs: {
    kicker: 'Клубы',
    title: 'Где играть',
    lede: 'Аффилиированные клубы с городом, залом и контактом — после получения списка от федерации.',
    emptyTitle: 'Список клубов пока пуст',
    emptyBody:
      'Структура готова: название, город, зал и контакт. Данные появятся после официальной публикации.',
  },
  team: {
    kicker: 'Сборная',
    title: 'Национальная сборная',
    lede: 'Состав, тренерский штаб и критерии отбора — в официальной публикации федерации.',
    intro: 'Состав национальной сборной публикуется только после официального утверждения федерацией.',
    emptyTitle: 'Состав не опубликован',
    emptyBody:
      'Имена спортсменов и тренеров на сайте пока не указываем. Раздел зарезервирован под возрастные группы и критерии отбора.',
    rank: 'Разряд',
    coach: 'Тренер',
    club: 'Клуб',
    categories: {
      u13: 'U13',
      u15: 'U15',
      u17: 'U17',
      senior: 'Senior',
    },
  },
  contact: {
    kicker: 'Контакты',
    title: 'Связаться с федерацией',
    lede: 'Контактное лицо федерации.',
    name: 'Имя',
    phone: 'Телефон',
    email: 'Почта',
    social: 'Соцсети',
  },
  membershipSteps: [
    {
      n: '01',
      title: 'Связаться с федерацией или клубом',
      text: 'Уточните актуальный порядок членства и возрастные категории у федерации или аффилиированного клуба.',
    },
    {
      n: '02',
      title: 'Оформить документы',
      text: 'После публикации типовых форм на сайте заявки и взносы будут оформляться по официальному регламенту.',
    },
    {
      n: '03',
      title: 'Получить регистрацию',
      text: 'Регистрационный статус члена и допуск к соревнованиям подтверждает федерация.',
    },
  ],
}

export const messages: Record<Locale, Messages> = { ro, ru }
