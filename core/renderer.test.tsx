import { describe, expect, it } from 'vitest'

import { render as r } from '@testing-library/react'

import { render } from '../core/renderer'

import { emptyDocument } from '../core/types'

const f = (a) => {
  const { asFragment, getByText } = r(a)
  return asFragment()
}

describe('heading', () => {
  it('noops', () => {
    expect(f(render(emptyDocument))).toMatchInlineSnapshot(`
      <DocumentFragment>
        <span>
          nope
        </span>
      </DocumentFragment>
    `)
  })
})
