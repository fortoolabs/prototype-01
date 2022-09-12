import { HTMLAttributes } from 'react'

type TagColor =
  | 'blue'
  | 'gray'
  | 'red'
  | 'green'
  | 'yellow'
  | 'indigo'
  | 'purple'
  | 'pink'

export function todoKeywordColorClasses(keyword: string): TagColor {
  switch (keyword) {
    case 'TODO':
      return 'red'
    case 'DONE':
    case 'CANCELLED':
    case 'CANCELED':
      return 'green'
    default:
      return 'yellow'
  }
}

const tagSizeClasses = (size?: string) => {
  switch (size) {
    case 'small':
      return 'text-xs h-6 py-1 px-2'
    case 'medium':
      return 'py-1 px-3 text-base'
    case 'large':
      return 'py-1 px-3 text-lg'
    default:
      return 'p-2'
  }
}

const shapeClasses = (val?: string) => {
  switch (val) {
    case 'block':
      return 'rounded'
    case 'pill':
    default:
      return 'rounded-full'
  }
}

const colorClasses = (color: string) => {
  switch (color) {
    case 'blue':
      return 'bg-blue-100 text-blue-900 border-blue-500'
    case 'gray':
      return 'bg-gray-100 text-gray-900 border-gray-500'
    case 'red':
      return 'bg-red-100 text-red-900 border-red-500'
    case 'green':
      return 'bg-green-100 text-green-900 border-green-500'
    case 'yellow':
      return 'bg-yellow-100 text-yellow-900 border-yellow-500'
    case 'indigo':
      return 'bg-indigo-100 text-indigo-900 border-indigo-500'
    case 'purple':
      return 'bg-purple-100 text-purple-900 border-purple-500'
    case 'pink':
      return 'bg-pink-100 text-pink-900 border-pink-500'
    default:
      return 'bg-pink-100 text-pink-900 border-pink-500'
  }
}

export type TagProps = {
  content: string
  color: TagColor
  size?: 'small' | 'medium' | 'large'
  style?: 'block' | 'pill'
}
export default function Tag({
  content,
  size,
  color = 'blue',
  style = 'pill',
  className,
}: TagProps & HTMLAttributes<'span'>) {
  return (
    //adding margin on one side here will eventually ruin some of
    //the styling either:
    //1. add margin to the neighboring component or element
    //2. add css 'gap' property for spacing if flex or grid layout

    <span
      className={[
        shapeClasses(style),
        colorClasses(color),
        tagSizeClasses(size),
        className,
      ].join(' ')}
    >
      {content}
    </span>
  )
}
