export const ADMIN_USER_KEY = 'mbf-admin-user'
export const ADMIN_PASS_KEY = 'mbf-admin-password'

export function getAdminAuth() {
  return {
    user: sessionStorage.getItem(ADMIN_USER_KEY) ?? '',
    password: sessionStorage.getItem(ADMIN_PASS_KEY) ?? '',
  }
}

export function setAdminAuth(user: string, password: string) {
  sessionStorage.setItem(ADMIN_USER_KEY, user)
  sessionStorage.setItem(ADMIN_PASS_KEY, password)
}

export function clearAdminAuth() {
  sessionStorage.removeItem(ADMIN_USER_KEY)
  sessionStorage.removeItem(ADMIN_PASS_KEY)
  sessionStorage.removeItem('mbf-admin-password')
}

export function hasAdminSession() {
  const { user, password } = getAdminAuth()
  return Boolean(user && password)
}

export function adminHeaders(): Record<string, string> {
  const { user, password } = getAdminAuth()
  return {
    'x-admin-user': user,
    'x-admin-password': password,
  }
}
