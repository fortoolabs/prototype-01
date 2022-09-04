import { Paragraph as GrommetParagraph } from 'grommet'

export type ParagraphProps = {
  children: string | JSX.Element[]
}

export default function Paragraph({ children }: ParagraphProps) {
  return <GrommetParagraph>{children}</GrommetParagraph>
}

export const ParagraphSmall = ({ children }: ParagraphProps) => {
  return <GrommetParagraph size="small">{children}</GrommetParagraph>
}
