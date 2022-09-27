import { describe, expect, it } from 'vitest'

import { render as r } from '@testing-library/react'

import { render, renderElement, destinationForHeading } from 'core/renderer'

import { emptyDocument } from 'core/types'

const f = (a) => {
  const { asFragment, getByText } = r(a)
  return asFragment()
}

describe('heading', () => {
  it('renders with slug as id when present', () => {
    expect(
      f(
        renderElement(
          {
            type: 'h',
            id: 'hopefully-random-id',
            level: 1,
            todoKeyword: 'TODO',
            priority: 'A',
            commented: true,
            tags: ['idea', 'strategy'],
            content: [{ type: 't', content: 'Collect underpants' }],
          },
          'blah',
          {
            ...emptyDocument,
            headingIdToSlugIndex: {
              'hopefully-random-id': 'some-slug',
            },
          },
        ),
      ),
    ).toMatchSnapshot()
  })

  it('renders with id when slug is not present', () => {
    expect(
      f(
        renderElement(
          {
            type: 'h',
            id: 'hopefully-random-id',
            level: 1,
            todoKeyword: 'TODO',
            priority: 'A',
            commented: true,
            tags: ['idea', 'strategy'],
            content: [{ type: 't', content: 'Collect underpants' }],
          },
          'blah',
          {
            ...emptyDocument,
            headingIdToSlugIndex: {
              'another-id': 'some-slug',
            },
          },
        ),
      ),
    ).toMatchSnapshot()
  })

  describe('destination helper', () => {
    it('defaults to heading id', () => {
      expect(
        destinationForHeading(
          {
            type: 'h',
            id: 'hopefully-random-id',
            level: 1,
            todoKeyword: 'TODO',
            priority: 'A',
            commented: true,
            tags: ['idea', 'strategy'],
            content: [{ type: 't', content: 'Collect underpants' }],
          },
          {
            ...emptyDocument,
            headingIdToSlugIndex: {
              'another-id': 'some-slug',
            },
          },
        ),
      ).toEqual('hopefully-random-id')
    })

    it('returns the slug', () => {
      expect(
        destinationForHeading(
          {
            type: 'h',
            id: 'hopefully-random-id',
            level: 1,
            todoKeyword: 'TODO',
            priority: 'A',
            commented: true,
            tags: ['idea', 'strategy'],
            content: [{ type: 't', content: 'Collect underpants' }],
          },
          {
            ...emptyDocument,
            headingIdToSlugIndex: {
              'hopefully-random-id': 'some-slug',
            },
          },
        ),
      ).toEqual('some-slug')
    })
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
        <div
          class="p-2 md:p-4 transition duration-0 hover:duration-150 hover:bg-gray-100 text-gray-600 hover:text-black rounded-md ring-inset hover:ring-1 hover:ring-gray-300"
        >
          <p>
            The first part of the 
            <b>
              masterplan
            </b>
          </p>
        </div>
      </DocumentFragment>
    `)
  })

  describe('including timestamp', () => {
    it('renders', () => {
      expect(
        f(
          renderElement({
            content: [
              {
                content: 'Watching Penelope and Morgan solve crimes on ',
                type: 't',
              },
              {
                content: '<2022-08-14 Sun>',
                type: 'Z',
              },
              {
                content: ' while testing fallback components.',
                type: 't',
              },
            ],
            type: 'p',
          }),
        ),
      ).toMatchInlineSnapshot(`
        <DocumentFragment>
          <div
            class="p-2 md:p-4 transition duration-0 hover:duration-150 hover:bg-gray-100 text-gray-600 hover:text-black rounded-md ring-inset hover:ring-1 hover:ring-gray-300"
          >
            <p>
              Watching Penelope and Morgan solve crimes on 
              <time
                datetime="2015-10-21"
              >
                &lt;2022-08-14 Sun&gt;
              </time>
               while testing fallback components.
            </p>
          </div>
        </DocumentFragment>
      `)
    })
  })
})

describe('fallback', () => {
  describe('for element', () => {
    it('renders', () => {
      expect(
        f(
          renderElement({
            type: 'e',
            content: 'some random junk',
          }),
        ),
      ).toMatchInlineSnapshot(`
        <DocumentFragment>
          <code
            class="p-2 rounded bg-gray-300/30 "
          >
            some random junk
          </code>
        </DocumentFragment>
      `)
    })
  })
  describe('for greater element', () => {
    it('renders', () => {
      expect(
        f(
          renderElement({
            type: 'E',
            content: 'some random junk',
          }),
        ),
      ).toMatchInlineSnapshot(`
        <DocumentFragment>
          <pre
            class="overflow-auto p-2 rounded bg-gray-300/30 "
          >
            some random junk
          </pre>
        </DocumentFragment>
      `)
    })
  })
})
