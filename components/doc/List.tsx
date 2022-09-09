import { PropsWithChildren } from 'react'

export type ListProps = {}
export type ListChildProps = {}

export function List({ children }: PropsWithChildren<ListProps>) {
  console.log(children?.toString)
  return <ul className="pl-10 list-disc my-4">{children}</ul>
}
export function ListChild({ children }: PropsWithChildren<ListChildProps>) {
  return <li>{children}</li>
}
