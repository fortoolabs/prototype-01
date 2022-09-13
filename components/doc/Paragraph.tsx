import { PropsWithChildren } from 'react'

import Block from 'components/doc/Block'

export type ParagraphProps = {}

export default function Paragraph({
  children,
}: PropsWithChildren<ParagraphProps>) {
  return (
    //block component removed because it is adding too much space
    //add and remove to see how it affects lists stories
    //again comes down to what we have to discuss on abstracting
    //things properly
    <Block>
      <p>{children}</p>
    </Block>
  )
}
