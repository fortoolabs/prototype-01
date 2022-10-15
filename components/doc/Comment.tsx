import React, { Fragment, useState, HTMLAttributes } from 'react'
import Image from 'next/image'
import { Tab } from '@headlessui/react'

import CaretDown from 'components/icons/CaretDown'
import { PlusCircleIcon, EllipsisVerticalIcon } from '@heroicons/react/20/solid'

type CommentProps = {
  author?: string
  avatar?: string
  date?: string
  text: string
}

export function Comment({ author, avatar, date, text }: CommentProps) {
  return (
    <div className="flex text-sm gap-3 items-start p-3 rounded-sm bg-gray-200 mb-2 last:mb-0">
      {avatar && (
        <div className="shrink-0">
          <Image
            src={avatar}
            alt={author || 'Author named not specified'}
            width={32}
            height={32}
            objectFit="contain"
            className="rounded-full"
          />
        </div>
      )}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between">
          <div className="flex gap-2">
            {author && <h4>{author}</h4>}
            {date && <h4 className="text-gray-500">{date}</h4>}
          </div>
          <EllipsisVerticalIcon className="h-4 w-4" />
        </div>
        <div className="text-gray-600 font-normal">{text}</div>
      </div>
    </div>
  )
}

export type CommentsBlockProps = {
  comments: CommentProps[]
}
// FIXME: Define proper func sig
export default function CommentsBlock({
  id,
  className,
  comments,
}: CommentsBlockProps & HTMLAttributes<'div'>) {
  const [show, setShown] = useState(false)

  const handleClick = () => {
    setShown((current) => !current)
  }
  const handleTabClick = () => {
    if (!show) {
      setShown(true)
    }
  }
  return (
    <div className={`${className} ${show ? 'z-10' : ''}`} id={id}>
      <Tab.Group
        as="section"
        className="w-97 bg-gray-100 p-3 rounded-xs boder-bottom border-4 border-white"
      >
        <Tab.List as="div" className="flex justify-between items-center">
          <div className={`flex gap-1 items-center cursor-pointer transition`}>
            <button onClick={handleClick}>
              {' '}
              <CaretDown
                className={`h-4 w-4 hover:fill-c-blue-hover ${
                  show ? ' ' : '-rotate-90'
                }`}
              />
            </button>

            <Tab as={Fragment}>
              {({ selected }) => (
                <div
                  className={`contents focus-visible:outline-none transition ${
                    selected ? '' : 'hover:text-c-blue-hover transition'
                  }`}
                  onClick={handleTabClick}
                >
                  <h3 className="text-base m-0">Comments</h3>
                  <div className="py-1 px-3 text-sm bg-gray-200 rounded-sm">
                    {comments.length}
                  </div>
                </div>
              )}
            </Tab>
          </div>

          <Tab
            as="button"
            className="text-c-blue-main text-base flex gap-1 items-center hover:text-c-blue-hover focus-visible:outline-none"
            onClick={handleTabClick}
          >
            <PlusCircleIcon className="w-4" />
            <h3>Add Comment</h3>
          </Tab>
        </Tab.List>
        <Tab.Panels
          className={` ${
            show
              ? 'max-h-screen transition-[max-height] duration-300 ease-in z-10'
              : 'opacity-0 max-h-0'
          } overflow-hidden`}
        >
          <Tab.Panel as="div" className="mt-3">
            {comments.map((comment, index) => (
              <Comment {...comment} key={`${id}-${index}`} />
            ))}
          </Tab.Panel>
          <Tab.Panel
            as="textarea"
            className="mt-4 resize-none border-0 w-full rounded-lg bg-gray-200 p-3 text-gray-600 text-sm h-36 focus:ring-0"
            maxLength={400}
            placeholder="type comment here"
          />
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
