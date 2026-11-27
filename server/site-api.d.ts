import type { IncomingMessage, ServerResponse } from 'node:http'

export function dataPaths(): {
  root: string
  seedFile: string
  siteFile: string
  uploadDir: string
}

export function ensureData(): void

export function handleSiteRequest(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<boolean>
