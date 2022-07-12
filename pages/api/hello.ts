// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export type HelloData = {
  name: string
}

function random(xs: Array<string>): string {
  if (xs.length == 0) {
    return 'invalid'
  }
  const idx = Math.floor(Math.random() * xs.length)
  // NOTE: this happens on the backend
  console.log('getting', idx, 'from', xs.length)
  return xs[idx]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<HelloData>,
) {
  res.status(200).json({
    name: random([
      // Imagine this being a call from a database 🙈
      'Andrew Kelley',
      'Bryan Cantrill',
      'Claire Wolf',
      'Dave Wilson (SystemCrafters)',
      'George Hotz',
      'Graham Hutton',
      'Jessie Frazelle',
      'John Wiegley',
      'Lex Fridman',
      'Mara Bos',
      'Mike Ross',
      'Oleh Krehel',
      'Paul Graham',
      'Sacha Chua',
      'Steve Purcell',
      'ThePrimeagen',
      'Theo Browne (t3.gg)',
      'Yannic Kilcher',
      'tecosaur',
    ]),
  })
}
