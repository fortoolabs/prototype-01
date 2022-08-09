import { describe, expect, it } from 'vitest'

import { render as r } from '@testing-library/react'

import { render, renderElement } from '../core/renderer'

import { emptyDocument } from '../core/types'

const f = (a) => {
  const { asFragment, getByText } = r(a)
  return asFragment()
}

describe('heading', () => {
  it('renders', () => {
    expect(
      f(
        renderElement({
          type: 'h',
          level: 1,
          todoKeyword: 'TODO',
          priority: 'A',
          commented: true,
          tags: ['idea', 'strategy'],
          content: [{ type: 't', content: 'Collect underpants' }],
        }),
      ),
    ).toMatchInlineSnapshot(`
      <DocumentFragment>
        <h1
          class="StyledHeading-sc-1rdh4aw-0 gLPrrO"
        >
          Collect underpants
        </h1>
      </DocumentFragment>
    `)
  })
})

describe('paragraph', () => {
  it('renders', () => {
    expect(
      f(
        renderElement({
          type: 'p',
          content: [
            { type: 't', content: 'The first part of the ' },
            { type: 'b', content: [{ type: 't', content: 'masterplan' }] },
          ],
        }),
      ),
    ).toMatchInlineSnapshot(`
      <DocumentFragment>
        <p
          class="StyledParagraph-sc-tbetod-0 lacipA"
        >
          The first part of the 
          <b>
            masterplan
          </b>
        </p>
      </DocumentFragment>
    `)
  })
})
