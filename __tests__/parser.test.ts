import { beforeAll, expect, describe, it } from 'vitest'

import { readFileSync } from 'fs'

import { emptyDocument } from 'core/types'
import parse from 'core/parser'

function readFixture(file: string): FDocument {
  return parse(
    readFileSync(`__fixtures__/${file}`, {
      encoding: 'utf8',
      flag: 'r',
    }),
  )
}

describe('generally', () => {
  it('empty string returns empty document', () => {
    expect(parse('')).toEqual(emptyDocument)
  })

  it('single word returns document with single text entry', () => {
    expect(parse('word')).toEqual({
      content: [{ content: [{ content: 'word', type: 't' }], type: 'p' }],
      todoStates: [],
    })
  })
})

describe('heading', () => {
  it('has title as content', () => {
    expect(parse('* How are you?').content[0].content).toEqual([
      { type: 't', content: 'How are you?' },
    ])
  })

  it('without title has empty content', () => {
    expect(parse('* ').content[0].content).toEqual([])
  })

  it('extracts tags', () => {
    expect(parse('* Design share button').content[0].tags).toHaveLength(0)
    expect(parse('* Design share button :ui:').content[0].tags).toHaveLength(1)
    expect(
      parse('* Design paraphrasing feature :ui:ML:NLP:').content[0].tags,
    ).toHaveLength(3)
  })

  it('extract commented status', () => {
    const isCommented = (x) => parse(x).content[0].commented
    expect(isCommented('* Basic title')).toEqual(false)
    expect(isCommented('* COMMENTED Basic title')).toEqual(true)
    expect(isCommented('* COMMENT Basic title')).toEqual(true)
    expect(isCommented('* [#A] COMMENT Basic title')).toEqual(true)
    expect(isCommented('* COMMENT [#A] Basic title')).toEqual(true)
    expect(isCommented('* TODO [#A] COMMENT Basic title')).toEqual(true)
    expect(isCommented('* TODO COMMENT [#A] Basic title')).toEqual(true)
    expect(
      isCommented(`* TODO [#A] COMMENT headline /italic/ title :some:tags:`),
    ).toEqual(true)
  })

  it('extracts the level', () => {
    expect(parse('* How are you?').content[0]).toHaveProperty('level', 1)
    expect(parse('**** How are you?').content[0]).toHaveProperty('level', 4)
    expect(parse('******************* How are you?').content[0]).toHaveProperty(
      'level',
      19,
    )
  })

  describe('priority', () => {
    const prio = (x) => parse(x).content[0].priority

    it('honors any alphanum single-char cookie', () => {
      expect(prio('* [#A] High priority :blah:')).toEqual('A')
      expect(prio('* [#1] High priority :blah:')).toEqual('1')
      expect(prio('* [#B] Low priority :blah:')).toEqual('B')
      expect(prio('* [#2] Low priority :blah:')).toEqual('2')
      expect(prio('* [#9] Purpose project')).toEqual('9')
      expect(prio('* [#Z] Purpose project')).toEqual('Z')
    })

    it('ignores multi-char cookie', () => {
      expect(prio('* [#42] Purpose project')).toEqual(null)
      expect(prio('* [#AB] Purpose project')).toEqual(null)
    })

    it('only honors pre-title cookie', () => {
      expect(prio('* [#C] Low [#B] priority :blah:')).toEqual('C')
      expect(prio('* [#3] Low [#B] priority :blah:')).toEqual('3')
      expect(prio('* Low [#B] priority :blah:')).toEqual(null)
      expect(prio('* Low priority [#A] :blah:')).toEqual(null)
    })
  })

  describe.todo('progress', () => {
    // Awaiting release of https://github.com/rasendubi/uniorg/commit/da79786f7c3afda29f8fb65052e09ca4fec6d4f3
    const dut = (x) => parse(x).content[0]
    it('TBD', () => {
      expect(dut('* Almost done [4/5]')).toEqual({})
    })
  })
})

describe('regular links', () => {
  const dut = (x) => parse(x).content[0].content[0]

  describe('for id', () => {
    const link = '[[id:blah-di-blah 12][example]]'
    it('parses', () => {
      expect(dut(link)).toMatchInlineSnapshot(`
        {
          "content": [
            {
              "content": "example",
              "type": "t",
            },
          ],
          "linkType": "id",
          "target": "id:blah-di-blah 12",
          "type": "a",
        }
      `)
    })
  })

  describe('with description', () => {
    const link = '[[https://www.example.com][example]]'

    it('extracts URL', () => {
      expect(dut(link)).toHaveProperty('target', 'https://www.example.com')
    })

    // We drop the label for now, use function extractLabel if needed
    it.skip('extracts a link label', () => {
      expect(dut(link)).toHaveProperty('label', 'example')
    })
  })

  describe('without description', () => {
    const link = '[[https://www.example.com]]'
    it('parses', () => {
      expect(dut(link)).toMatchInlineSnapshot(`
        {
          "content": [],
          "linkType": "https",
          "target": "https://www.example.com",
          "type": "a",
        }
      `)
    })
  })
})

describe('Roadmap.org', () => {
  const ast = readFixture('Roadmap.org')

  it('has all todo states', () => {
    expect(ast.todoStates).toEqual([
      'TODO',
      'IDEA',
      'SCOPE',
      'INSKETCH',
      'INDEV',
      'DONE(d)',
    ])
  })

  it('has the title', () => {
    expect(ast.title).toEqual('Product Roadmap')
  })

  describe('top paragraph', () => {
    const top = ast.content[0]

    it('wraps a single text in a paragraph object', () => {
      expect(top).toMatchSnapshot()
    })
  })
})
