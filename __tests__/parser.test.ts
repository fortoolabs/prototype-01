import { expect, test } from 'vitest'

import parse from '../core/parser'
import { readFileSync } from 'fs'

test('parses', () => {
  const f = readFileSync('__fixtures__/Roadmap.org', {
    encoding: 'utf8',
    flag: 'r',
  })
  expect(parse(f)).toEqual({
    todoStates: ['TODO', 'IDEA', 'SCOPE', 'INSKETCH', 'INDEV', 'DONE(d)'],
    title: 'Product Roadmap',
    content: [],
  })
})
