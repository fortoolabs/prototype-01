import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Box, TextInput, Button } from "grommet";
import base64url from "base64url";

import { Heading1, Heading2 } from '../../components/Heading'


const Home: NextPage = () => {
  const [value, setValue] = React.useState('');
  return (
    <Box>
        <Heading1 content="Welcome to Formation!" />
        <p>Enter URL to read .org file</p>
        <TextInput
      placeholder="https://...filename.org"
      value={value}
      onChange={event => setValue(event.target.value)}
    />
    <Link href={`/reader/${base64url(value)}`}>
    <Button>Go!</Button>
    </Link>
    </Box>
  );
};

export default Home;
