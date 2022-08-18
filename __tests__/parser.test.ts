import { beforeAll, expect, describe, it } from 'vitest'

import { readFileSync } from 'fs'

import { emptyDocument } from 'core/types'
import parse, {
  extractText,
  extractHeadlines,
} from 'core/parser'

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

  it('extracts entities', () => {
    // https://orgmode.org/worg/dev/org-syntax.html#Entities
    expect(parse('\\cent').content[0].content).toMatchInlineSnapshot(`
      [
        {
          "content": "cent",
          "html": "&cent;",
          "type": "?",
        },
      ]
    `)
  })

  it('extracts table cells', () => {
    // https://orgmode.org/worg/dev/org-syntax.html#Table_Cells
    expect(parse('12 |').content[0].content).toMatchInlineSnapshot(`
      [
        {
          "content": "12 |",
          "type": "t",
        },
      ]
    `)
  })

  it('extracts LaTeX Fragments', () => {
    // https://orgmode.org/worg/dev/org-syntax.html#LaTeX_Fragments
    // TODO: Examine if this is expected behavior
    expect(parse('enlargethispage{2\\baselineskip}').content[0].content)
      .toMatchInlineSnapshot(`
        [
          {
            "content": "enlargethispage{2",
            "type": "t",
          },
          {
            "content": "\\\\baselineskip",
            "type": "X",
          },
          {
            "content": "}",
            "type": "t",
          },
        ]
      `)
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

  it('extracts commented status', () => {
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

  describe('tree', () => {
    const raw = `#+TITLE: Demonstrating a Heading Tree
* A
** A1
** A2
* B
* C
* D
*** D1
********* Dx
* E
** E1`
    it('extracts all headings', () => {
      expect(extractHeadlines(parse(raw).content)).toMatchSnapshot()
    })

    it('extracts top-level headings only', () => {
      expect(extractHeadlines(parse(raw).content, 1)).toMatchSnapshot()
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

    // We drop the label for now, use function extractText if needed
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

describe('lists', () => {
  describe('unordered', () => {
    const raw = `
- fruits
  - apples
  - bananas
  - pears
  - tomatoes
- [/] vegetables
  - [X] spinach
  - [ ] broccoli
  - [ ] cauliflower
  - [X] cabbage
  - [~] salat
`
    it('parses', () => {
      expect(parse(raw)).toMatchInlineSnapshot(`
        {
          "content": [
            {
              "content": "- fruits
          - apples
          - bananas
          - pears
          - tomatoes
        - [/] vegetables
          - [X] spinach
          - [ ] broccoli
          - [ ] cauliflower
          - [X] cabbage
          - [~] salat
        ",
              "type": "e",
            },
          ],
          "todoStates": [],
        }
      `)
    })
  })
})

describe('extractText', () => {
  const extract = (x) => extractText(parse(x).content[0])

  it('contains unformatted text', () => {
    expect(
      extract('Hello *bold*, /italic/, +strikethrough+ and _underline_'),
    ).toEqual('Hello bold, italic, strikethrough and underline')
  })

  it('contains superscripts and subscripts', () => {
    expect(extract('A^2')).toEqual('A2')
    expect(extract('A_2')).toEqual('A2')
    expect(extract('A_{twenty}')).toEqual('Atwenty')
  })

  it('contains code', () => {
    expect(extract('Something ~funny~')).toEqual('Something funny')
  })

  it('contains verbatim text', () => {
    expect(extract('A =verbatim= string')).toEqual('A verbatim string')
  })

  it('contains LaTeX', () => {
    expect(extract('That equation $e = mc^2$')).toEqual(
      'That equation $e = mc^2$',
    )
  })

  describe('on timestamps', () => {
    // https://orgmode.org/worg/dev/org-syntax.html#Timestamps
    // There are seven timestamp patterns
    it('returns an empty string when of the active variety', () => {
      expect(extract('<1997-11-03 Mon 19:15>')).toEqual('')
    })
    it('returns en empty string when of the active range variety', () => {
      expect(extract('<2012-02-08 Wed 20:00 ++1d>')).toEqual('')
      expect(extract('<2030-10-05 Sat +1m -3d>')).toEqual('')
    })

    it('returns an empty string for the inactive range variety', () => {
      expect(extract('[2004-08-24 Tue]--[2004-08-26 Thu]')).toEqual('')
    })

    it('returns an empty string when of the diary variety', () => {
      expect(extract('<%%(diary-float t 4 2)>')).toEqual('')
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
