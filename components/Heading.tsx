export type HeadingProps = {
    level: number
    title: string
}

export default function Heading({ title }: HeadingProps) {
    // TODO: I'm lazy and since Stefano is working on it, I'll leave it blank 🤷🏿‍♂️
    return <h1>{title}</h1>
}
