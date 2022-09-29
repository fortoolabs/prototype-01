import '../styles/globals.css'

import { decorator as base64Decorator } from '../__mocks__/base64url'

import { RouterContext } from 'next/dist/shared/lib/router-context'

import * as NextImage from 'next/image'

const OriginalNextImage = NextImage.default

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
})

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
}

// https://storybook.js.org/docs/react/writing-stories/decorators
export const decorators = [base64Decorator]
