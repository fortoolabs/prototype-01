import { beforeAll, expect, describe, it } from 'vitest'

import parse from '../core/parser'
import { readFileSync, writeFileSync } from 'fs'

const isDebugDumpEnabled = false

const emptyDocument = {
  content: [],
  todoStates: [],
}

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
    expect(parse('')).toEqual(emptyDocument)
  })

  it('single word to return document with single text entry', () => {
    expect(parse('word')).toEqual({
      content: [{ content: [{ content: 'word', type: 't' }], type: 'p' }],
      todoStates: [],
    })
  })

  describe('single 1st level headline', () => {
    const data = parse('* How are you?')

    it('returns list of a single text element', () => {
      expect(data.content[0].content).toEqual([
        { type: 't', content: 'How are you?' },
      ])
    })

    it('has zero tags', () => {
      expect(data.content[0].tags).toHaveLength(0)
    })

    it('has level 1', () => {
      expect(data.content[0]).toHaveProperty('level', 1)
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

    describe('top paragraph', () => {
      const top = ast.content[0]

      it('has matching type', () => {
        expect(top).toHaveProperty('type', 'p')
      })

      it('wraps a single text in a paragraph object', () => {
        expect(top).toEqual({
          type: 'p',
          content: [
            {
              type: 't',
              content:
                '⚠️ All points in this roadmap are listed in their relative order of importance. In case points get reordered in this document, it should be interpreted as a change in prioritization. Points are ordered by highest priority first.\n',
            },
          ],
        })
      })
    })
  })
})
