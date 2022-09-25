import { expect, describe, it } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'

import parse, { extractNestedHeadings } from 'core/parser'

import TOC from 'components/app/TOC'

const samples = {
  another: [
    '#+TITLE: Test Document',
    '* another one',
    '** another two',
    '*** another three',
    '**** another four',
  ].join('\n'),
  parts: [
    '* Part 1',
    '** Part 1.1 with a very long title that requires space',
    '** Part 1.2',
    '*** Part 1.2.1',
    '* Part 2',
    '* Part 3',
  ].join('\n'),
}

describe('toc', () => {
  const getHeadlines = (doc, depth?) =>
    extractNestedHeadings(doc.content, depth)
  function* idGenerator() {
    let counter = 0
    while (true) {
      counter++
      yield `id:${counter}`
    }
  }

  it('renders', () => {
    const gen = idGenerator()
    const next = () => gen.next().value
    const doc = parse(samples.parts, next)

    const { asFragment } = render(
      <TOC
        idToSlugIndex={doc.headingIdToSlugIndex}
        headings={getHeadlines(doc, 3)}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })
  it('renders maximally until depth 3', async () => {
    const gen = idGenerator()
    const next = () => gen.next().value
    const doc = parse(samples.another, next)

    render(
      <TOC
        idToSlugIndex={doc.headingIdToSlugIndex}
        headings={getHeadlines(doc, 3)}
      />,
    )
    expect(screen.queryByText(/another one/i)).not.toBe(null)
    expect(screen.queryByText(/another two/i)).not.toBe(null)
    expect(screen.queryByText(/another three/i)).not.toBe(null)
    expect(screen.queryByText(/another four/i)).toBe(null)
  })
})
