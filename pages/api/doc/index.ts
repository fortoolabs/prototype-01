import type { NextApiRequest, NextApiResponse } from 'next'

import base64url from 'base64url'

// TODO: Support absolute imports through baseUrl
import parse, { FDocument } from '../../../core/parser'

// TODO: Move into API d.ts (to be created)
export type DocResponse = [
  number,
  {
    url?: string
    handle?: string
    doc?: FDocument
    reason?: string
  },
]

const fetcher = (url: string): Promise<FDocument> =>
  fetch(url)
    .then((r) => r.text())
    .then((t) => parse(t))

const id = (id: string | string[]) => id
const concat = (acc: string, x: string) => acc.concat(x)

const validURL = (x: string) => {
  try {
    return Boolean(new URL(x))
  } catch (e) {
    console.error(e)
    return false
  }
}

// TODO: Implement non-handler form
export const getDoc = async (
  target: string | string[] | undefined,
): Promise<DocResponse> => {
  if (target === undefined) {
    const payload = {
      reason: 'The target must be defined!',
    }
    return [400, payload]
  }

  const handle = [target].flatMap(id).reduce(concat, '')

  // TODO: Drop this check as we conduct a validURL check later on
  if (handle.trim() === '') {
    const payload = {
      reason: 'The target must be a non-empty string!',
    }
    return [400, payload]
  }

  const url = base64url.decode(handle)

  if (!validURL(url)) {
    const payload = {
      handle,
      reason: 'The target must be a Base64-encoded valid URL',
    }
    return [400, payload]
  }

  const handleSuccess = (doc: FDocument): DocResponse => [
    200,
    { url, handle, doc },
  ]

  const handleError = (err: any): DocResponse => {
    console.error(err)
    const payload = {
      url,
      handle,
      reason: 'We have no clue either but we are figuring this out though.',
    }
    return [500, payload]
  }

  return await fetcher(url).then(handleSuccess).catch(handleError)
}

export const getDocWithHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  target: string | string[] | undefined,
): Promise<void> => {
  const { method } = req

  switch (method) {
    case 'GET': {
      const [status, payload] = await getDoc(target)
      res.status(status).json(payload)
      break
    }
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).json({
        reason: `Method ${method} Not Allowed`,
      })
  }
}
