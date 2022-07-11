interface HeadingProps {
  title: string;
  content: string;
}

export default function Heading({ title }: HeadingProps) {
    return (<h1>{title}</h1>);
}

export const Heading1 = ({content}: HeadingProps) => {
  return <h1>{content}</h1>
}
export const Heading2 = ({content}: HeadingProps) => {
  return <h2>{content}</h2>
}
