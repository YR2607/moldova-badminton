import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import { dataPaths, ensureData, handleSiteRequest } from './site-api.mjs'

const MIME = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

function loadEnvFile() {
  const file = path.resolve(process.cwd(), '.env')
  if (!fs.existsSync(file)) return
  for (const raw of fs.readFileSync(file, 'utf8').split('\n')) {
    const line = raw.trim()
    if (!line || line.startsWith('#')) continue
    const eq = line.indexOf('=')
    if (eq <= 0) continue
    const key = line.slice(0, eq).trim()
    let value = line.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (process.env[key] === undefined) process.env[key] = value
  }
}

function sendFile(res, file, fallbackHtml = false) {
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
    if (fallbackHtml) {
      const index = path.join(path.resolve(process.cwd(), 'dist'), 'index.html')
      if (fs.existsSync(index)) {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.setHeader('Cache-Control', 'no-store')
        fs.createReadStream(index).pipe(res)
        return
      }
    }
    res.statusCode = 404
    res.end('Not found')
    return
  }
  const ext = path.extname(file).toLowerCase()
  res.statusCode = 200
  res.setHeader('Content-Type', MIME[ext] || 'application/octet-stream')
  res.setHeader(
    'Cache-Control',
    ext === '.html' ? 'no-store' : 'public, max-age=31536000, immutable',
  )
  fs.createReadStream(file).pipe(res)
}

loadEnvFile()
ensureData()

const dist = path.resolve(process.cwd(), 'dist')
const port = Number(process.env.PORT || 3000)
const { root } = dataPaths()

if (!fs.existsSync(path.join(dist, 'index.html'))) {
  console.error('Missing dist/. Run npm run build first.')
  process.exit(1)
}

const server = http.createServer(async (req, res) => {
  try {
    if (await handleSiteRequest(req, res)) return
    const url = decodeURIComponent((req.url ?? '/').split('?')[0] || '/')
    const relative = path.normalize(url).replace(/^[/\\]+/, '').replace(/^(\.\.[/\\])+/, '')
    const file = path.resolve(dist, relative)
    if (!file.startsWith(dist + path.sep) && file !== dist) {
      res.statusCode = 400
      res.end()
      return
    }
    if (relative && fs.existsSync(file) && fs.statSync(file).isFile()) {
      sendFile(res, file)
      return
    }
    sendFile(res, path.join(dist, 'index.html'), true)
  } catch (error) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.end(error instanceof Error ? error.message : 'error')
  }
})

server.listen(port, '0.0.0.0', () => {
  console.log(`MBF site on http://0.0.0.0:${port}`)
  console.log(`Data directory: ${root}`)
})
