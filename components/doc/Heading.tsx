export type HeadingProps = {
  level: '1' | '2' | '3' | '4' | '5' | '6' | 1 | 2 | 3 | 4 | 5 | 6 | undefined
  title: string | JSX.Element[]
  isTodo?: boolean
  state?: string
}

function Heading({ title, level }: HeadingProps) {
  switch (level) {
    case '1':
    case 1:
      return <h1>{title}</h1>

    case '2':
    case 2:
      return <h2>{title}</h2>

    case '3':
    case 3:
      return <h3>{title}</h3>

    case '4':
    case 4:
      return <h4>{title}</h4>

    case '5':
    case 5:
      return <h5>{title}</h5>

    case '6':
    case 6:
      return <h6>{title}</h6>

    default:
      return <p className={`heading-${level}`}>{title}</p>
  }
}

export default function HeadingLine({ title, level }: HeadingProps) {
  return <Heading level={level} title={title} />
}
