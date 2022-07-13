import parse from '../core/parser'
import { readFileSync } from 'fs'

it('parses', () => {
  const f = readFileSync('__fixtures__/Roadmap.org', {
    encoding: 'utf8',
    flag: 'r',
  })
  expect(parse(f)).toEqual('output')
})
