export type TagProps = {
  content: string
  color?: string
  size?: 'small' | 'medium' | 'large'
}
type colorsProps = {
  [key: string]: string
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

  const colors: colorsProps = {
    blue: 'bg-blue-100 text-blue-800',
    gray: 'bg-gray-100 text-gray-800',
    red: 'bg-red-100 text-red-800',
    green: 'bg-green-100 text-green-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    indigo: 'bg-indigo-100 text-indigo-800',
    purple: 'bg-purple-100 text-purple-800',
    pink: 'bg-pink-100 text-pink-800',
  }

  const colorClasses = colors[color] ? colors[color] : colors['blue']
  const sizeClasses = sizes[size]

  return (
    <span
      className={`font-semibold rounded-full mx-2 ${colorClasses} ${sizeClasses}`}
    >
      {content}
    </span>
  )
}
