import React, { Fragment } from 'react'
import Image from 'next/image'
import { Tab } from '@headlessui/react'

import CaretDown from 'components/icons/CaretDown'
import { PlusCircleIcon } from '@heroicons/react/20/solid'

const avatarPath =
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
    <div className="flex text-sm gap-3 items-start py-3 border-b  border-gray-200 last:border-0 last:pb-0">
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
        <div className="flex gap-2">
          <h4>{name}</h4>
          <h4 className="text-gray-500">{date}</h4>
        </div>
        <div className="text-gray-600 font-normal">{comment}</div>
      </div>
    </div>
  )
}

function Comment() {
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
    <Tab.Group as="section" className="w-97 bg-gray-100 p-3 rounded-xs">
      <Tab.List as="div" className="flex justify-between items-center">
        <Tab as="div" className="flex gap-1 items-center focus:ring-0">
          <CaretDown className="h-4 w-4 -rotate-90 hover:fill-c-blue-hover" />
          <h3 className="text-base m-0">Comments</h3>
          <div className="py-1 px-3 text-sm bg-gray-200 rounded-sm">2</div>
        </Tab>
        <Tab
          as="button"
          className="text-c-blue-main flex gap-1 items-center hover:text-c-blue-hover"
        >
          <PlusCircleIcon className="w-4" />
          <h3>Add Comment</h3>
        </Tab>
      </Tab.List>
      <Tab.Panels as={Fragment}>
        <Tab.Panel as="div" className="mt-3">
          {comments.map((comment, index) => (
            <SingleComment commentData={comment} key={index} />
          ))}
        </Tab.Panel>
        <Tab.Panel
          as="textarea"
          className="mt-4 resize-none border-0 w-full rounded-lg bg-gray-200 p-3 text-gray-600 text-sm h-36"
          maxLength={400}
          placeholder="type comment here"
        />
      </Tab.Panels>
    </Tab.Group>
  )
}

export default Comment
