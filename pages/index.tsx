import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Box, Grommet } from 'grommet'

import Code from '../components/Code'
import { HeadingGrommet } from '../components/Heading'

// map available components
const components = {
  HeadingGrommet,
  Code,
}

// dummy json
const json = [
  {
    name: 'HeadingGrommet',
    props: { level: '1' },
    content: 'This is some heading content for heading 1',
  },
  {
    name: 'HeadingGrommet',
    props: { level: '2' },
    content: 'This is some other content for heading 2',
  },
  {
    name: 'HeadingGrommet',
    props: { level: '3' },
    content: 'This is some other content for heading 3',
  },
  {
    name: 'HeadingGrommet',
    props: { level: '4' },
    content: 'This is some other content for heading 4',
  },
  {
    name: 'HeadingGrommet',
    props: { level: '5' },
    content: 'This is some other content for heading 5',
  },
  {
    name: 'HeadingGrommet',
    props: { level: '6' },
    content: 'This is some other content for heading 6',
  },
  {
    name: 'Code',
    content: 'const test = 123',
    props: {
      language: 'javascript',
    },
  },
]

// dynamic component
const DynamicComponent = (
  component: {
    name: string
    content: string
    props?: { language?: string; level?: string }
  },
  i: number,
) => {
  const Component = components[component.name as keyof typeof components]
  const _props = component.props ? component.props : {}
  if (!Component) {
    console.error(`component ${component.name} was not found in component map`)
    return <></>
  }
  return <Component key={i} content={component.content} props={_props} />
}

const AppBar = (props: any) => (
  <Box
    tag="header"
    direction="row"
    align="center"
    justify="between"
    background="brand"
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    elevation="medium"
    style={{ zIndex: '1' }}
    {...props}
  />
)

const Home: NextPage = () => {
  const theme = {
    global: {
      colors: {
        brand: '#228BE6',
      },
      font: {
        family: 'Roboto',
        size: '18px',
        height: '20px',
      },
    },
  }
  return (
    <div>
      <Head>
        <title>Formartion.tools</title>
      </Head>
      <Grommet theme={theme}>
        <main></main>
        <AppBar>Hello Grommet!</AppBar>
        <h1>Welcome to Formation.tools!</h1>
        {/* iterate over json, build right component */}
        <div>{json.map((component, i) => DynamicComponent(component, i))}</div>
      </Grommet>
    </div>
  )
}

export default Home
