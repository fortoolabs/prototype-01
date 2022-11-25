import React from 'react'

type ButtonProps = {
  Icon?: any
  onClickEvent?: any
  className?: string
  iconStyles?: string
}

export default function ContentContainerButton({
  Icon,
  className,
  iconStyles,
  onClickEvent,
}: ButtonProps) {
  return (
    <button
      onClick={onClickEvent}
      className={`bg-gray-100 rounded-md p-3 transition cursor-pointer ${className}`}
    >
      <Icon className={`${iconStyles}`} />
    </button>
  )
}
