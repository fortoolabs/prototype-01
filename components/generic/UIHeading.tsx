import type { FC } from 'react'
import { Heading as GrommetHeading } from 'grommet'

export type UIHeadingProps = {
  level: '1' | '2' | '3' | '4' | '5' | '6' | 1 | 2 | 3 | 4 | 5 | 6 | undefined
  children: string
  subheading?: string
  [x: string]: any
}

// Heading for UI elements, distinct from reader element 'heading'
// set properties in formation-theme heading.level[level].small
export const UIHeading: FC<UIHeadingProps> = (props) => {
  return (
    <GrommetHeading margin={{ bottom: '0px' }} size="small" {...props}>
      {props.children.toUpperCase()}
    </GrommetHeading>
  )
}

export const UISubheading: FC<UIHeadingProps> = (props) => {
  return (
    <GrommetHeading
      margin={{ top: '0px' }}
      color={{ light: 'grey97', dark: 'grey97' }}
      size="small"
      {...props}
    >
      {props.children}
    </GrommetHeading>
  )
}
