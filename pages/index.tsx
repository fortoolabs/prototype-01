import type { NextPage, NextApiResponse } from "next";
import useSWR, { Key, Fetcher } from "swr";

import Head from 'next/head'
import Image from 'next/image'
import { Box, Grommet } from 'grommet'

import Code from '../components/Code'
import { Heading1, Heading2 } from '../components/Heading'

import Par from '../components/Paragraph'

// Dummy API call
import type { HelloData } from "./api/hello";

type User = {
  name: string;
  age: number;
};

const fetcher: Fetcher<HelloData, string> = (url) =>
  fetch("./api/hello").then((r) => r.json());

type HelloResponse = {
  hello: string;
  isLoading: boolean;
  isError: Error;
};

function validName(data: HelloData | undefined): string {
  console.log("validName", data, data == undefined);
  if (data == undefined) {
    return "that which should not be named";
  }
  return data.name;
}

function useHello(): HelloResponse {
  const { data, error } = useSWR("/api/hello", fetcher);

  return {
    hello: validName(data),
    isLoading: !error && !data,
    isError: error,
  };
}

// map available components
const components = { Heading1, Heading2, Code, Par }

// dummy json
const json = [
  {
    name: 'Heading1',
    content: 'This is some heading content for heading 1',
  },
  {
    name: 'Heading2',
    content: 'This is some other content for heading 2',
  },
  {
    name: 'Code',
    content: 'const test = 123',
    props: {
      language: 'javascript',
    },
  },
  {
    name: 'Paragraph',
    content:
      'This is some content for the paragraph component. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
]

// dynamic component
const DynamicComponent = (
  component: { name: string; content: string; props?: { language?: string } },
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

  const { hello, isLoading, isError }: HelloResponse = useHello();

  return (
    <div>
      <Head>
        <title>Formartion.tools</title>
      </Head>
      <Grommet theme={theme}>
        <AppBar>Hello Grommet!</AppBar>
        <h1>Welcome to Formation!</h1>
        <p>
          This is some dynamic content from the api: 👉🏿 <strong>{hello}</strong>
          {isLoading && <span>⏳</span>}
        </p>

        {/* iterate over json, build right component */}
        <div>{json.map((component, i) => DynamicComponent(component, i))}</div>
      </Grommet>
    </div>
  );
};

export default Home;
