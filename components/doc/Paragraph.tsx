import { PropsWithChildren } from 'react'

export type ParagraphProps = {}

export default function Paragraph({
  children,
}: PropsWithChildren<ParagraphProps>) {
  return <p>{children}</p>
}
