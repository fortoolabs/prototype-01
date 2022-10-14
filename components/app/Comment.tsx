import React, { Fragment, useState, HTMLAttributes } from 'react'
import Image from 'next/image'
import { Tab } from '@headlessui/react'

import CaretDown from 'components/icons/CaretDown'
import { PlusCircleIcon, EllipsisVerticalIcon } from '@heroicons/react/20/solid'

const avatarPath =
  // TODO: Remove images listing in next.config.js
  'https://pbs.twimg.com/profile_images/1276458607702241282/eAH3B2eT_400x400.jpg'

export interface CommentData {
  name: string
  avatar: string
  date: string
  comment: string
}
type CommentProps = {
  commentData: CommentData
}
function SingleComment({ commentData }: CommentProps) {
  const { name, avatar, date, comment } = commentData
  return (
    <div className="flex text-sm gap-3 items-start p-3 rounded-sm bg-gray-200 mb-2 last:mb-0">
      <div className="shrink-0">
        <Image
          src={avatar}
          alt={name}
          width={32}
          height={32}
          objectFit="contain"
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <h4>{name}</h4>
            <h4 className="text-gray-500">{date}</h4>
          </div>
          <EllipsisVerticalIcon className="h-4 w-4" />
        </div>
        <div className="text-gray-600 font-normal">{comment}</div>
      </div>
    </div>
  )
}

function Comment({ className }: HTMLAttributes<'div'>) {
  const [show, setShown] = useState(false)

  const handleClick = () => {
    setShown((current) => !current)
  }
  const handleTabClick = () => {
    if (!show) {
      setShown(true)
    }
  }

  const comments = [
    {
      name: 'David Asabina',
      avatar: avatarPath,
      date: '30/08/2022',
      comment:
        'Generalist-reading secondary markets buyer. Satoshi themed Macbook airapologist',
    },
    {
      name: 'David Asabina',
      avatar: avatarPath,
      date: '30/08/2022',
      comment:
        'Solidity focused crypto mining installation. Python-learning destitute growth hacker.',
    },
  ]
  return (
    <div className={`${className} ${show ? 'z-10' : ''}`}>
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
              <SingleComment commentData={comment} key={index} />
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

export default Comment
