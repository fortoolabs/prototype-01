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
}
export default function Tag({
  content,
  color = 'blue',
  size = 'small',
}: TagProps) {
  const sizes = {
    small: 'py-0.5 px-2.5 text-xs',
    medium: 'py-1 px-3 text-base',
    large: 'py-1.5 px-3.5 text-lg',
  }

  const colors = {
    blue: 'bg-blue-100 text-blue-800',
    gray: 'bg-gray-100 text-gray-800',
    red: 'bg-red-100 text-red-800',
    green: 'bg-green-100 text-green-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    indigo: 'bg-indigo-100 text-indigo-800',
    purple: 'bg-purple-100 text-purple-800',
    pink: 'bg-pink-100 text-pink-800',
  }

  return (
    <span
      className={[
        'font-semibold',
        'rounded-full',
        'mr-2 mt-2',
        colors[color] ? colors[color] : colors['blue'],
        sizes[size],
      ].join(' ')}
    >
      {content}
    </span>
  )
}
