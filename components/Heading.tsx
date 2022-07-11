interface HeadingProps {
  content: string;
}

export const Heading1 = ({content}: HeadingProps) => {
  return <h1>{content}</h1>
}
export const Heading2 = ({content}: HeadingProps) => {
  return <h2>{content}</h2>
}
