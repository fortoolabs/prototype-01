import * as React from 'react'

import { Grommet, Paragraph as GrommetParagraph } from 'grommet'

export type ParagraphProps = {
  children: string
}

export default function Paragraph({ children }: ParagraphProps) {
  return <GrommetParagraph>{children}</GrommetParagraph>
}
