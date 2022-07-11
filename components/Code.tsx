import { Box } from 'grommet'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

interface HeadingProps {
  content: string;
}

export default function Code({ content }: HeadingProps) {
    return (<Box>
      <SyntaxHighlighter
        tabIndex="0"
        style={prism.light}
        wrapLongLines
        language="javascript"
      >
        {content}
      </SyntaxHighlighter>
    </Box>);
}

 