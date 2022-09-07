import { PropsWithChildren } from 'react'

import Block from 'components/doc/Block'

export type ParagraphProps = {}

export default function Paragraph({
  children,
}: PropsWithChildren<ParagraphProps>) {
  return (
    <Block>
      <p>{children}</p>
    </Block>
  )
}
