import { beforeAll, expect, describe, it } from 'vitest'

import { readFileSync } from 'fs'

import { emptyDocument, FDocument, FHeading } from 'core/types'
import parse, {
  extractText,
  extractFormattedText,
  extractHeadlines,
  extractNestedHeadlines,
  unpackTodoKeyword,
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

  describe('table of contents', () => {
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
    describe('flat extraction', () => {
      it('extracts all headings', () => {
        expect(extractHeadlines(parse(raw).content)).toMatchSnapshot()
      })

      it('extracts top-level headings only', () => {
        expect(extractHeadlines(parse(raw).content, 1)).toMatchSnapshot()
      })
    })

    describe('nested extraction', () => {
      it('extracts all headings', () => {
        expect(extractNestedHeadlines(parse(raw).content)).toMatchSnapshot()
      })
      it('extracts top-level headings only', () => {
        expect(extractNestedHeadlines(parse(raw).content, 1)).toMatchSnapshot()
      })
    })
  })
})

describe('heading', () => {
  // TODO: Pretty unsafe but this is test code 🤷🏿‍♂️
  const getFirstAsHeading = (x: FDocument): FHeading => x.content[0].content[0]

  it('has title as content', () => {
    expect(getFirstAsHeading(parse('* How are you?')).content).toEqual([
      { type: 't', content: 'How are you?' },
    ])
  })

  it('without title has empty content', () => {
    expect(getFirstAsHeading(parse('* ')).content).toEqual([])
  })

  it('extracts tags', () => {
    expect(getFirstAsHeading(parse('* Design share button')).tags).toHaveLength(
      0,
    )
    expect(
      getFirstAsHeading(parse('* Design share button :ui:')).tags,
    ).toHaveLength(1)
    expect(
      getFirstAsHeading(parse('* Design paraphrasing feature :ui:ML:NLP:'))
        .tags,
    ).toHaveLength(3)
  })

  it('extracts commented status', () => {
    const isCommented = (x) => getFirstAsHeading(parse(x)).commented
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
    expect(getFirstAsHeading(parse('* How are you?'))).toHaveProperty(
      'level',
      1,
    )
    expect(getFirstAsHeading(parse('**** How are you?'))).toHaveProperty(
      'level',
      4,
    )
    expect(
      getFirstAsHeading(parse('******************* How are you?')),
    ).toHaveProperty('level', 19)
  })

  describe('priority', () => {
    const prio = (x) => getFirstAsHeading(parse(x)).priority

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
    const dut = (x) => getFirstAsHeading(parse(x))
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

describe.todo('timestamp', () => {})

describe('list', () => {
  const dut = (x) => parse(x).content[0]

  it('parses when unordered', () => {
    const raw = `
- A
- B
`
    expect(dut(raw)).toMatchInlineSnapshot(`
        {
          "content": [
            {
              "checkbox": null,
              "content": [
                {
                  "content": [
                    {
                      "content": "A
        ",
                      "type": "t",
                    },
                  ],
                  "type": "p",
                },
              ],
              "type": "I",
            },
            {
              "checkbox": null,
              "content": [
                {
                  "content": [
                    {
                      "content": "B
        ",
                      "type": "t",
                    },
                  ],
                  "type": "p",
                },
              ],
              "type": "I",
            },
          ],
          "type": "L",
          "variant": "unordered",
        }
      `)
  })

  it('parses when ordered', () => {
    const raw = `
1. one
2. two
`
    expect(dut(raw)).toMatchInlineSnapshot(`
        {
          "content": [
            {
              "checkbox": null,
              "content": [
                {
                  "content": [
                    {
                      "content": "one
        ",
                      "type": "t",
                    },
                  ],
                  "type": "p",
                },
              ],
              "type": "I",
            },
            {
              "checkbox": null,
              "content": [
                {
                  "content": [
                    {
                      "content": "two
        ",
                      "type": "t",
                    },
                  ],
                  "type": "p",
                },
              ],
              "type": "I",
            },
          ],
          "type": "L",
          "variant": "ordered",
        }
      `)
  })

  it('parses when descriptive', () => {
    const raw = `
- one :: first number
- two :: 2nd number
`
    expect(dut(raw)).toMatchInlineSnapshot(`
      {
        "content": [
          {
            "checkbox": null,
            "content": [
              {
                "content": [
                  {
                    "content": "first number
      ",
                    "type": "t",
                  },
                ],
                "type": "p",
              },
            ],
            "type": "I",
          },
          {
            "checkbox": null,
            "content": [
              {
                "content": [
                  {
                    "content": "2nd number
      ",
                    "type": "t",
                  },
                ],
                "type": "p",
              },
            ],
            "type": "I",
          },
        ],
        "type": "L",
        "variant": "descriptive",
      }
    `)
  })

  describe('of various types nested', () => {
    const raw = `
- fruits
  1. apples

    - Apple Computer :: a computer company

    - Apple Records :: record label

    - Grannie Smith :: green apple

  - bananas

    Bananas are a good source of electrolyte and potassium

  - pears

  - tomatoes

- [-] vegetables
  - [X] spinach
  - [ ] broccoli
  - [ ] cauliflower
  - [X] cabbage
  - [~] salat
`
    it('parses', () => expect(dut(raw)).toMatchSnapshot())
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

  describe('on links', () => {
    const link = '[[id:blah-di-blah 12][example]]'

    it('extracts a link label', () => {
      expect(extract(link)).toEqual('example')
    })
  })
})

describe('extractFormattedText', () => {
  const extract = (x) => extractFormattedText(parse(x).content[0])

  it('returns with formatting', () => {
    expect(
      extract(
        'Hello *bold_{twelve}*, /italic/, +strikethrough+ and _underline_',
      ),
    ).toMatchSnapshot()
  })

  it('returns code', () => {
    expect(extract('Something ~funny~')).toMatchSnapshot()
  })

  it('returns verbatim text', () => {
    expect(extract('A =verbatim= string')).toMatchSnapshot()
  })

  it('returns LaTeX', () => {
    expect(extract('That equation $e = mc^2$')).toMatchInlineSnapshot(
      `
      [
        {
          "content": "That equation ",
          "type": "t",
        },
        {
          "content": "$e = mc^2$",
          "type": "X",
        },
      ]
    `,
    )
  })

  describe('hides timestamps', () => {
    // https://orgmode.org/worg/dev/org-syntax.html#Timestamps
    // There are seven timestamp patterns
    it('returns an empty string when of the active variety', () => {
      expect(extract('<1997-11-03 Mon 19:15>')).toEqual([])
    })
    it('returns en empty string when of the active range variety', () => {
      expect(extract('<2012-02-08 Wed 20:00 ++1d>')).toEqual([])
      expect(extract('<2030-10-05 Sat +1m -3d>')).toEqual([])
    })

    it('returns an empty string for the inactive range variety', () => {
      expect(extract('[2004-08-24 Tue]--[2004-08-26 Thu]')).toEqual([])
    })

    it('returns an empty string when of the diary variety', () => {
      expect(extract('<%%(diary-float t 4 2)>')).toEqual([])
    })
  })

  describe('give a headline', () => {
    it('returns the headline text', () => {
      expect(extract('* TODO Calculate a^2 [2004-08-24 Tue]'))
        .toMatchInlineSnapshot(`
        [
          {
            "content": "Calculate a",
            "type": "t",
          },
          {
            "content": [
              {
                "content": "2",
                "type": "t",
              },
            ],
            "type": "^",
          },
          {
            "content": " ",
            "type": "t",
          },
        ]
      `)
    })
  })
})

describe('unpackTodoKeyword', () => {
  it('reads the keyword name', () => {
    expect(unpackTodoKeyword('TODO')).toHaveProperty('name', 'TODO')
  })

  it('reads the shortcut', () => {
    expect(unpackTodoKeyword('TODO(t)')).toHaveProperty('shortcut', 't')
  })

  const emptyTransitionConfig = {
    isAnnotated: false,
    isTimestamped: false,
  }

  describe('with only an entry setting', () => {
    it('reads timestamp setting', () => {
      expect(unpackTodoKeyword('TODO(!)').onEntry).toEqual({
        isAnnotated: false,
        isTimestamped: true,
      })
      expect(unpackTodoKeyword('TODO(!)').onExit).toEqual(emptyTransitionConfig)
    })

    it('reads annotate setting', () => {
      expect(unpackTodoKeyword('TODO(@)').onEntry).toEqual({
        isAnnotated: true,
        isTimestamped: true,
      })
      expect(unpackTodoKeyword('TODO(@)').onExit).toEqual(emptyTransitionConfig)
    })

    it('reads redundant setting', () => {
      expect(unpackTodoKeyword('TODO(!@)').onEntry).toEqual({
        isAnnotated: true,
        isTimestamped: true,
      })
      expect(unpackTodoKeyword('TODO(!@)').onExit).toEqual(
        emptyTransitionConfig,
      )

      expect(unpackTodoKeyword('TODO(@!)').onEntry).toEqual({
        isAnnotated: true,
        isTimestamped: true,
      })
      expect(unpackTodoKeyword('TODO(@!)').onExit).toEqual(
        emptyTransitionConfig,
      )
    })
  })

  describe('with only an exit setting', () => {
    it('reads timestamp setting', () => {
      expect(unpackTodoKeyword('TODO(t/!)').onExit).toEqual({
        isAnnotated: false,
        isTimestamped: true,
      })
      expect(unpackTodoKeyword('TODO(t/!)').onEntry).toEqual(
        emptyTransitionConfig,
      )
    })

    it('reads annotate setting', () => {
      expect(unpackTodoKeyword('TODO(t/@)').onExit).toEqual({
        isAnnotated: true,
        isTimestamped: true,
      })
      expect(unpackTodoKeyword('TODO(t/@)').onEntry).toEqual(
        emptyTransitionConfig,
      )
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
