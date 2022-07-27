import { expect, describe, it } from 'vitest'

import parse from '../core/parser'
import { readFileSync, writeFileSync } from 'fs'

const isDebugDumpEnabled = false

function readFixture(file: string, isDebugDumpEnabled: boolean): FDocument {
  const raw = readFileSync(`__fixtures__/${file}`, {
    encoding: 'utf8',
    flag: 'r',
  })

  const data = parse(raw)

  if (isDebugDumpEnabled) {
    writeFileSync(`__fixtures__/${file}.dump.json`, JSON.stringify(data))
  }
  return data
}

describe('parse', () => {
  it('empty string to return empty document', () => {
    expect(parse('')).toEqual({
      content: [],
      todoStates: [],
    })
  })

  it('single word to return document with single text entry', () => {
    expect(parse('word')).toEqual({
      content: [{ content: [{ content: 'word', type: 't' }], type: 'p' }],
      todoStates: [],
    })
  })

  describe('Roadmap.org', () => {
    const ast = readFixture('Roadmap.org', isDebugDumpEnabled)

    it('to return all todo states', () => {
      expect(ast.todoStates).toEqual([
        'TODO',
        'IDEA',
        'SCOPE',
        'INSKETCH',
        'INDEV',
        'DONE(d)',
      ])
    })

    it('to return the title', () => {
      expect(ast.title).toEqual('Product Roadmap')
    })

    it('to return a list of content', () => {
      expect(ast.content).toEqual([
        {
          type: 'p',
          content: [
            {
              type: 't',
              content:
                '⚠️ All points in this roadmap are listed in their relative order of importance. In case points get reordered in this document, it should be interpreted as a change in prioritization. Points are ordered by highest priority first.\n',
            },
          ],
        },
      ])
    })
  })
})
