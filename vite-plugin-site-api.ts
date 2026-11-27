import { randomUUID } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import type { IncomingMessage, ServerResponse } from 'node:http'
import type { Plugin } from 'vite'

const DATA_FILE = path.resolve(process.cwd(), 'data/site.json')
const UPLOAD_DIR = path.resolve(process.cwd(), 'public/uploads')
const MAX_UPLOAD = 15 * 1024 * 1024
const ALLOWED_TYPES: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'application/pdf': 'pdf',
}

function password() {
  return process.env.ADMIN_PASSWORD ?? ''
}

function send(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(body))
}

function readBody(req: IncomingMessage) {
  return new Promise<string>((resolve, reject) => {
    const chunks: Buffer[] = []
    req.on('data', (chunk) => chunks.push(chunk as Buffer))
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    req.on('error', reject)
  })
}

function isAuthorized(req: IncomingMessage) {
  const expected = password()
  if (!expected) return false
  const header = req.headers['x-admin-password']
  return header === expected
}

export function siteApiPlugin(): Plugin {
  return {
    name: 'site-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0] ?? ''
        if (!url.startsWith('/api/')) {
          next()
          return
        }

        try {
          if (req.method === 'GET' && url === '/api/site') {
            const data = fs.readFileSync(DATA_FILE, 'utf8')
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            res.end(data)
            return
          }

          if (req.method === 'POST' && url === '/api/login') {
            const body = JSON.parse((await readBody(req)) || '{}') as { password?: string }
            const expected = password()
            if (!expected) {
              send(res, 500, { ok: false, error: 'ADMIN_PASSWORD is not set' })
              return
            }
            if (body.password !== expected) {
              send(res, 401, { ok: false, error: 'wrong password' })
              return
            }
            send(res, 200, { ok: true })
            return
          }

          if (req.method === 'PUT' && url === '/api/site') {
            if (!isAuthorized(req)) {
              send(res, 401, { ok: false, error: 'unauthorized' })
              return
            }
            const body = await readBody(req)
            JSON.parse(body)
            fs.writeFileSync(DATA_FILE, `${JSON.stringify(JSON.parse(body), null, 2)}\n`)
            send(res, 200, { ok: true })
            return
          }

          if (req.method === 'POST' && url === '/api/upload') {
            if (!isAuthorized(req)) {
              send(res, 401, { ok: false, error: 'unauthorized' })
              return
            }
            const payload = JSON.parse((await readBody(req)) || '{}') as {
              type?: string
              data?: string
            }
            const ext = payload.type ? ALLOWED_TYPES[payload.type] : undefined
            if (!ext || !payload.data) {
              send(res, 400, { ok: false, error: 'unsupported file' })
              return
            }
            const buffer = Buffer.from(payload.data, 'base64')
            if (buffer.length > MAX_UPLOAD) {
              send(res, 400, { ok: false, error: 'file too large' })
              return
            }
            fs.mkdirSync(UPLOAD_DIR, { recursive: true })
            const filename = `${Date.now()}-${randomUUID().slice(0, 8)}.${ext}`
            fs.writeFileSync(path.join(UPLOAD_DIR, filename), buffer)
            send(res, 200, { ok: true, url: `/uploads/${filename}` })
            return
          }

          send(res, 404, { ok: false, error: 'not found' })
        } catch (error) {
          send(res, 500, { ok: false, error: error instanceof Error ? error.message : 'error' })
        }
      })
    },
  }
}
