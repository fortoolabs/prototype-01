import type { NextPage } from "next";
import Head from "next/head";
import { Box, Grommet } from "grommet";

import Heading from "../components/Heading";

const AppBar = (props: any) => (
  <Box
    tag="header"
    direction="row"
    align="center"
    justify="between"
    background="brand"
    pad={{ left: "medium", right: "small", vertical: "small" }}
    elevation="medium"
    style={{ zIndex: "1" }}
    {...props}
  />
);

const Home: NextPage = () => {
  const theme = {
    global: {
      colors: {
        brand: "#228BE6",
      },
      font: {
        family: "Roboto",
        size: "18px",
        height: "20px",
      },
    },
  };
  return (
    <div>
      <Head>
        <title>Formartion.tools</title>
      </Head>

      <Grommet theme={theme}>
        <main>
          <Heading title="Roadmap" />

          <p>
            Get started by editing <code>pages/index.tsx</code>
          </p>
        </main>
        <AppBar>Hello Grommet!</AppBar>
      </Grommet>
    </div>
  );
};

export default Home;
