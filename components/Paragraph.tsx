import * as React from 'react'

import { Grommet, Paragraph as GrommetParagraph } from 'grommet'

export interface ParagraphProps {
  children: string
}

export default function Paragraph({ children }: ParagraphProps) {
  return <GrommetParagraph color="blue">{children}</GrommetParagraph>
}

// const AppBar = (props: any) => (
//     <Box
//       tag="header"
//       direction="row"
//       align="center"
//       justify="between"
//       background="brand"
//       pad={{ left: 'medium', right: 'small', vertical: 'small' }}
//       elevation="medium"
//       style={{ zIndex: '1' }}
//       {...props}
//     />
//   )
