import { expect, describe, it } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'

// import type { TOCProps, depthProp } from 'components/app/TOC'
import TOC, { TOCStub } from 'components/app/TOC'

const TOCStubDepth4 = [
	...TOCStub,
	{
		heading: 'another one',
		children: [
			{
				heading: 'another two',
				children: [
					{
						heading: 'another three',
						children: [
							{
								heading: 'another four',
							},
						],
					},
				],
			},
		],
	},
]

describe('toc', () => {
	it('renders', () => {
		const { asFragment } = render(<TOC headings={TOCStub} />)
		expect(asFragment()).toMatchSnapshot()
	})
	it('renders maximally until depth 3', async () => {
		render(<TOC headings={TOCStubDepth4} />)
		expect(screen.queryByText(/another one/i)).not.toBe(null)
		expect(screen.queryByText(/another two/i)).not.toBe(null)
		expect(screen.queryByText(/another three/i)).not.toBe(null)
		expect(screen.queryByText(/another four/i)).toBe(null)
	})
})
