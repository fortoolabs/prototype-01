import { HTMLAttributes } from 'react'

import { WorkflowStateColor } from 'core/renderer'

const tagSizeClasses = (size?: string) => {
  switch (size) {
    case 'small':
      return 'text-xs h-6 py-1 px-2'
    case 'medium':
      return 'py-1 px-2 text-base'
    case 'large':
      return 'py-1 px-2 text-lg'
    default:
      return 'p-0 px-2'
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

// TODO: Type to WorkflowStateColor?
const colorClasses = (color: string) => {
  switch (color) {
    case 'blue':
      return 'bg-blue-100 text-blue-900 border-blue-300'
    case 'gray':
      return 'bg-gray-100 text-gray-900 border-gray-300'
    case 'red':
      return 'bg-red-100 text-red-900 border-red-300'
    case 'green':
      return 'bg-green-100 text-green-900 border-green-300'
    case 'yellow':
      return 'bg-yellow-100 text-yellow-900 border-yellow-300'
    case 'indigo':
      return 'bg-indigo-100 text-indigo-900 border-indigo-300'
    case 'purple':
      return 'bg-purple-100 text-purple-900 border-purple-300'
    case 'pink':
      return 'bg-pink-100 text-pink-900 border-pink-300'
    default:
      return 'bg-pink-100 text-pink-900 border-pink-300'
  }
}

const circleColorClasses = (color: string) => {
  switch (color) {
    case 'blue':
      return 'bg-blue-400'
    case 'gray':
      return 'bg-gray-400'
    case 'red':
      return 'bg-red-400'
    case 'green':
      return 'bg-green-400'
    case 'yellow':
      return 'bg-yellow-400'
    case 'indigo':
      return 'bg-indigo-400'
    case 'purple':
      return 'bg-purple-400'
    case 'pink':
      return 'bg-pink-400'
    default:
      return 'bg-pink-400'
  }
}

export type TagProps = {
  content: string
  color: WorkflowStateColor
  size?: 'small' | 'medium' | 'large'
  shape?: 'block' | 'pill' | 'circle'
}
export default function Tag({
  content,
  size,
  color = 'blue',
  shape = 'pill',
  className,
}: TagProps & HTMLAttributes<'span'>) {
  return (
    //adding margin on one side here will eventually ruin some of
    //the styling either:
    //1. add margin to the neighboring component or element
    //2. add css 'gap' property for spacing if flex or grid layout

    <span
      className={[
        'border border-1',
        shapeClasses(shape),
        shape === 'circle' ? circleColorClasses(color) : colorClasses(color),
        tagSizeClasses(size),
        className,
      ].join(' ')}
    >
      {shape === 'circle' ? '' : content}
    </span>
  )
}
