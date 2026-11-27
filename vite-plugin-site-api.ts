import type { Plugin } from 'vite'
// @ts-expect-error JS module
import { handleSiteRequest } from './server/site-api.mjs'

export function siteApiPlugin(): Plugin {
  return {
    name: 'site-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const handled = await handleSiteRequest(req, res)
        if (!handled) next()
      })
    },
  }
}
