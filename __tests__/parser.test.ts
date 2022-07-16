import { expect, test } from 'vitest'

import parse from '../core/parser'
import { readFileSync, writeFileSync } from 'fs'

const dump = true

const proc = (file, parser) => {
  const raw = readFileSync(file, {
    encoding: 'utf8',
    flag: 'r',
  })

  const data = parse(raw)

  if (dump) {
    writeFileSync(`${file}.dump.json`, JSON.stringify(data))
  }
  return data
}

test('parses', () => {
  expect(proc('__fixtures__/Roadmap.org')).toEqual({
    todoStates: ['TODO', 'IDEA', 'SCOPE', 'INSKETCH', 'INDEV', 'DONE(d)'],
    title: 'Product Roadmap',
    content: [],
  })
})
