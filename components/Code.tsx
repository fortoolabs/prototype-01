import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

export type CodeProps = {
    language: string
    source: string
}

export default function Code({ language, source }: CodeProps) {
    return (
        <SyntaxHighlighter tabIndex="0" wrapLongLines language={language}>
            {source}
        </SyntaxHighlighter>
    )
}
