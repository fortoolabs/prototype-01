import * as React from 'react'

import { Paragraph as GrommetParagraph } from 'grommet'

export type ParagraphProps = {
  children: string
}

export default function Paragraph({ children }: ParagraphProps) {
  return <GrommetParagraph>{children}</GrommetParagraph>
}

export const ParagraphSmall = ({ children }: ParagraphProps) => {
  return <GrommetParagraph size="small">{children}</GrommetParagraph>
}
