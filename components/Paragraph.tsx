import { Grommet, Paragraph } from 'grommet'

interface ParagraphProps {
  content: string
}

const Par = ({ content }: ParagraphProps) => {
  return <Paragraph color="blue">{content}</Paragraph>
}

export default Par

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
