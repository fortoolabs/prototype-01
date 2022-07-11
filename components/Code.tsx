import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

interface CodeProps {
  content: string;
  props?: any;
}

export default function Code({ content, props }: CodeProps) {
  return (
    <SyntaxHighlighter tabIndex="0" wrapLongLines language={props.language}>
      {content}
    </SyntaxHighlighter>
  );
}
