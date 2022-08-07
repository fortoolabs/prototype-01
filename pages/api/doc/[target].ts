// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { getDocWithHandler, DocResponse } from './index'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<DocResponse>,
) => {
  const {
    query: { target },
  } = req
  getDocWithHandler(req, res, target)
}

export default handler
