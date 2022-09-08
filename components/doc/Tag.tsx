import { HTMLAttributes } from 'react'

export type TagProps = {
  content: string
  color:
    | 'blue'
    | 'gray'
    | 'red'
    | 'green'
    | 'yellow'
    | 'indigo'
    | 'purple'
    | 'pink'
  size: 'small' | 'medium' | 'large'
  style?: 'block' | 'pill'
}
export default function Tag({
  content,
  color = 'blue',
  size = 'small',
  style = 'pill',
  className,
}: TagProps & HTMLAttributes<'span'>) {
  const getStyle = (val: string | undefined) => {
    switch (val) {
      case 'block':
        return 'rounded'
      case 'pill':
      default:
        return 'rounded-full'
    }
  }

  const sizes = {
    small: 'py-0.5 px-2.5 text-xs',
    medium: 'py-1 px-3 text-base',
    large: 'py-1.5 px-3.5 text-lg',
  }

  const colors = {
    blue: 'bg-blue-100 text-blue-900',
    gray: 'bg-gray-100 text-gray-900',
    red: 'bg-red-100 text-red-900',
    green: 'bg-green-100 text-green-900',
    yellow: 'bg-yellow-100 text-yellow-900',
    indigo: 'bg-indigo-100 text-indigo-900',
    purple: 'bg-purple-100 text-purple-900',
    pink: 'bg-pink-100 text-pink-900',
  }

  return (
    //adding margin on one side here will eventually ruin some of
    //the styling either:
    //1. add margin to the neighboring component or element
    //2. add css 'gap' property for spacing if flex or grid layout

    <span
      className={[
        'font-semibold',
        getStyle(style),
        colors[color] ? colors[color] : colors['blue'],
        sizes[size],
        className,
      ].join(' ')}
    >
      {content}
    </span>
  )
}
