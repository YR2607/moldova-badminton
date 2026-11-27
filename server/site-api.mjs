import { randomUUID } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'

const MAX_UPLOAD = 15 * 1024 * 1024
const ALLOWED_TYPES = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'application/pdf': 'pdf',
}

export function dataPaths() {
  const root = path.resolve(process.env.DATA_DIR || path.join(process.cwd(), 'data'))
  const seedFile = path.resolve(process.env.SEED_FILE || path.join(process.cwd(), 'data/site.json'))
  return {
    root,
    seedFile,
    siteFile: path.join(root, 'site.json'),
    uploadDir: path.join(root, 'uploads'),
  }
}

export function ensureData() {
  const { root, seedFile, siteFile, uploadDir } = dataPaths()
  fs.mkdirSync(root, { recursive: true })
  fs.mkdirSync(uploadDir, { recursive: true })
  if (!fs.existsSync(siteFile)) {
    if (fs.existsSync(seedFile) && path.resolve(seedFile) !== path.resolve(siteFile)) {
      fs.copyFileSync(seedFile, siteFile)
    } else if (!fs.existsSync(siteFile)) {
      fs.writeFileSync(siteFile, '{}\n')
    }
  }
}

function credentials() {
  return {
    user: process.env.ADMIN_USER ?? '',
    password: process.env.ADMIN_PASSWORD ?? '',
  }
}

function same(left, right) {
  return Boolean(left) && left === right
}

function send(res, status, body) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(body))
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (chunk) => chunks.push(chunk))
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    req.on('error', reject)
  })
}

function isAuthorized(req) {
  const expected = credentials()
  if (!expected.user || !expected.password) return false
  const user = req.headers['x-admin-user']
  const password = req.headers['x-admin-password']
  return same(String(user ?? ''), expected.user) && same(String(password ?? ''), expected.password)
}

function writeSiteFile(siteFile, body) {
  const parsed = JSON.parse(body)
  const payload = `${JSON.stringify(parsed, null, 2)}\n`
  const tmp = `${siteFile}.${process.pid}.tmp`
  fs.writeFileSync(tmp, payload)
  fs.renameSync(tmp, siteFile)
}

function pathname(req) {
  return (req.url ?? '').split('?')[0]
}

function serveUpload(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') return false
  const url = pathname(req)
  if (!url.startsWith('/uploads/')) return false
  const name = path.basename(url)
  if (!name || name !== url.slice('/uploads/'.length)) {
    res.statusCode = 400
    res.end()
    return true
  }
  const file = path.join(dataPaths().uploadDir, name)
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
    return false
  }
  const ext = path.extname(name).toLowerCase()
  const types = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.pdf': 'application/pdf',
  }
  res.statusCode = 200
  res.setHeader('Content-Type', types[ext] || 'application/octet-stream')
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
  if (req.method === 'HEAD') {
    res.end()
    return true
  }
  fs.createReadStream(file).pipe(res)
  return true
}

async function handleApi(req, res) {
  const url = pathname(req)
  if (!url.startsWith('/api/')) return false

  ensureData()
  const { siteFile, uploadDir } = dataPaths()

  if (req.method === 'GET' && url === '/api/site') {
    const data = fs.readFileSync(siteFile, 'utf8')
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.setHeader('Cache-Control', 'no-store')
    res.end(data)
    return true
  }

  if (req.method === 'POST' && url === '/api/login') {
    const body = JSON.parse((await readBody(req)) || '{}')
    const expected = credentials()
    if (!expected.user || !expected.password) {
      send(res, 500, { ok: false, error: 'admin credentials are not set' })
      return true
    }
    if (!same(body.user ?? '', expected.user) || !same(body.password ?? '', expected.password)) {
      send(res, 401, { ok: false, error: 'wrong credentials' })
      return true
    }
    send(res, 200, { ok: true })
    return true
  }

  if (req.method === 'PUT' && url === '/api/site') {
    if (!isAuthorized(req)) {
      send(res, 401, { ok: false, error: 'unauthorized' })
      return true
    }
    writeSiteFile(siteFile, await readBody(req))
    send(res, 200, { ok: true })
    return true
  }

  if (req.method === 'POST' && url === '/api/upload') {
    if (!isAuthorized(req)) {
      send(res, 401, { ok: false, error: 'unauthorized' })
      return true
    }
    const payload = JSON.parse((await readBody(req)) || '{}')
    const ext = payload.type ? ALLOWED_TYPES[payload.type] : undefined
    if (!ext || !payload.data) {
      send(res, 400, { ok: false, error: 'unsupported file' })
      return true
    }
    const buffer = Buffer.from(payload.data, 'base64')
    if (buffer.length > MAX_UPLOAD) {
      send(res, 400, { ok: false, error: 'file too large' })
      return true
    }
    fs.mkdirSync(uploadDir, { recursive: true })
    const filename = `${Date.now()}-${randomUUID().slice(0, 8)}.${ext}`
    fs.writeFileSync(path.join(uploadDir, filename), buffer)
    send(res, 200, { ok: true, url: `/uploads/${filename}` })
    return true
  }

  send(res, 404, { ok: false, error: 'not found' })
  return true
}

export async function handleSiteRequest(req, res) {
  ensureData()
  const url = pathname(req)
  if (url === '/health' && req.method === 'GET') {
    send(res, 200, { ok: true })
    return true
  }
  if (url.startsWith('/api/')) {
    try {
      return await handleApi(req, res)
    } catch (error) {
      send(res, 500, { ok: false, error: error instanceof Error ? error.message : 'error' })
      return true
    }
  }
  try {
    return serveUpload(req, res)
  } catch {
    res.statusCode = 500
    res.end()
    return true
  }
}
