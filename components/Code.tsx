// import { Box } from 'grommet'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

interface HeadingProps {
  content: string;
  language: string;
}

export default function Code({ content, language }: HeadingProps) {
  return (
    <SyntaxHighlighter tabIndex="0" wrapLongLines language="javascript">
      {content}
    </SyntaxHighlighter>
  );
}
