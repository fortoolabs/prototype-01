import { describe, expect, it } from 'vitest'

import { render as r } from '@testing-library/react'

import { render, renderElement } from 'core/renderer'

import { emptyDocument } from 'core/types'

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
        <div
          class="p-2 md:p-4 transition duration-0 hover:duration-150 hover:bg-gray-100 text-gray-600 hover:text-black rounded-md ring-inset hover:ring-1 hover:ring-gray-300 md:flex text-2xl"
        >
          <span
            class="inline-block align-baseline align-text-bottom mr-3 last:mr-0 text-ellipsis flex-none"
          >
            <span
              class="border border-1 rounded bg-red-100 text-red-900 border-red-300 p-0 px-2 "
            >
              TODO
            </span>
          </span>
           
          <h1
            class="inline-block align-baseline align-text-bottom mr-3 last:mr-0 text-ellipsis font-bold text-2xl grow"
          >
            Collect underpants
          </h1>
           
          <span
            class="inline-block align-baseline align-text-bottom mr-3 last:mr-0 text-ellipsis space-x-1 space-x-reverse space-x-y space-y-reverse flex flex-row-reverse flex-wrap w-2/6"
          >
            <span
              class="border border-1 rounded-full bg-blue-100 text-blue-900 border-blue-300 text-xs h-6 py-1 px-2 "
            >
              idea
            </span>
            <span
              class="border border-1 rounded-full bg-blue-100 text-blue-900 border-blue-300 text-xs h-6 py-1 px-2 "
            >
              strategy
            </span>
          </span>
        </div>
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
