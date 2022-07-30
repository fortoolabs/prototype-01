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

it('empty string returns empty document', () => {
  expect(parse('')).toEqual(emptyDocument)
})

it('single word returns document with single text entry', () => {
  expect(parse('word')).toEqual({
    content: [{ content: [{ content: 'word', type: 't' }], type: 'p' }],
    todoStates: [],
  })
})

describe('headline', () => {
  it('has correct text', () => {
    expect(parse('* How are you?').content[0].content).toEqual([
      { type: 't', content: 'How are you?' },
    ])
  })

  it('without text has empty content', () => {
    expect(parse('* ').content[0].content).toEqual([])
  })

  it('extracts tags', () => {
    expect(parse('* Design share button').content[0].tags).toHaveLength(0)
    expect(parse('* Design share button :ui:').content[0].tags).toHaveLength(1)
    expect(
      parse('* Design paraphrasing feature :ui:ML:NLP:').content[0].tags,
    ).toHaveLength(3)
  })

  it('extracts the level', () => {
    expect(parse('* How are you?').content[0]).toHaveProperty('level', 1)
    expect(parse('**** How are you?').content[0]).toHaveProperty('level', 4)
    expect(parse('******************* How are you?').content[0]).toHaveProperty(
      'level',
      19,
    )
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
