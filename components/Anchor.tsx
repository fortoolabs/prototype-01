export type AnchorProps = {
    url: string 
    label: string | JSX.Element[]
    externalLink?: boolean
    [x: string]: any
  }
  
  export default function Anchor({
    url,
    label,
    externalLink,
    ...props
  }: AnchorProps) {
    return (
      // eslint-disable-next-line react/jsx-no-target-blank
      <a className="text-blue-500 transition-colors hover:text-blue-700"
       href={url}
       target={ externalLink ? "_blank" : "" }
       rel={externalLink ? "noopener noreferrer" : ""}
       {...props} >
        {label}
      </a>
    )
  }
  