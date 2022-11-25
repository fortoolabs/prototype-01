import React, { useState } from 'react'
import { ResizeCallbackData } from 'react-resizable'
import {
  //MagnifyingGlassIcon,
  //ClockIcon,
  ChevronDoubleRightIcon,
  ChatBubbleLeftEllipsisIcon,
} from '@heroicons/react/20/solid'

import TOC from './TOC'
import Board from '../Board'
import SwitchMode from './SwitchMode'
import Prose from 'components/mode/Prose'
import ResizablePane from './ResizablePane'
import ContentContainerButton from './ContentContainerButton'
import { extractNestedHeadings, FDocument } from 'core/parser'

export type ContentContaierProps = {
  doc?: FDocument
  initialSideBar?: Boolean
}

export function SideBarContainer({
  toc,
  initialSideBar = true,
}: {
  toc: React.ReactNode
  initialSideBar?: Boolean
}) {
  const [showSideBar, setShowSideBar] = useState(initialSideBar)

  const handleSideBarIconClick = () => {
    setShowSideBar((current) => !current)
  }

  const handleResizeStop = (
    _: React.SyntheticEvent,
    resizableData: ResizeCallbackData,
  ) => {
    // anytime dragging stops the width is saved to the localstorage
    localStorage.setItem('tocWidth', resizableData.size.width.toString())
  }
  //const actionItemClasses =
  //  'text-gray-400 font-semibold text-xs flex gap-2 px-4'
  //const iconClasses = 'w-4 h-4 shrink-0'

  return (
    <>
      <div
        className={`hidden lg:block absolute group ${
          showSideBar ? 'hidden' : ''
        }`}
      >
        <button
          className={`pl-5 py-2 relative group ${showSideBar ? '' : 'z-10'}`}
          type="button"
          onClick={handleSideBarIconClick}
        >
          <ChevronDoubleRightIcon className="w-6 h-6 absolute" />
        </button>
        <div
          className={[
            'absolute ',
            'left-11',
            'top-3',
            'p-2',
            'rounded-md ',
            'whitespace-nowrap',
            '-z-10',
            'text-white',
            'text-xs',
            'bg-primary-main',
            'opacity-0 ',
            'transiton',
            'group-hover:opacity-100',
            'group-hover:transtion',
          ].join(' ')}
        >
          Open Sidebar
        </div>
      </div>
      <ResizablePane
        handlePosition="e"
        width={parseInt(localStorage.getItem('tocWidth')!, 10) || 400}
        visibleHandle={false}
        maxWidth={500}
        handleResizeStop={handleResizeStop}
        className={[
          'hidden',
          'lg:order-first',
          'lg:flex',
          'lg:flex-col',
          'lg:shrink-0',
          'bg-primary-main',
          'pt-5',
          'border-0',
          'border-r-2',
          'font-inter',
          'gap-4',
          'overflow-hidden',
          'transition-transform',
          showSideBar
            ? 'lg:relative'
            : 'lg:absolute inset-0 -translate-x-full transition-transform ',
        ].join(' ')}
      >
        <aside className="contents">
          <div className="text-gray-400 font-semibold text-xs px-4 flex justify-between items-center relative">
            <button
              className="text-white shrink-0 hover:bg-primary-hover p-1 group"
              onClick={handleSideBarIconClick}
            >
              <ChevronDoubleRightIcon className="w-5 h-5 rotate-180 hover:fill-c-blue-main" />
              <span className="absolute mx-1 top-0 right-11 p-2 -z-10 whitespace-nowrap bg-primary-hover text-white transtion group-hover:z-0">
                {' '}
                Close Sidebar
              </span>
            </button>
          </div>
          <div className="relative h-[80%] overflow-y-auto text-white">
            {toc}
          </div>

          {/*<div className={actionItemClasses}>
            <MagnifyingGlassIcon className={iconClasses} />
            Search
          </div>
          <div className={actionItemClasses}>
            <ClockIcon className={iconClasses} />
            All Updates
          </div>*/}
        </aside>
      </ResizablePane>
    </>
  )
}

function ContentContainer({
  doc,
  initialSideBar = true,
  className,
}: ContentContaierProps & React.HTMLAttributes<HTMLDivElement>) {
  const [mode, setMode] = useState('prose')
  const [showComments, setShowComments] = useState(false)

  if (doc === undefined) {
    return <span>This scrappy prototype stinks!</span>
  }
  const { content } = doc

  const main = () => {
    switch (mode) {
      case 'kanban':
        return <Board doc={doc} />
      case 'prose':
      default:
        return <Prose isSerif={false} doc={doc} />
    }
  }
  const handleCommentClick = () => {
    setShowComments((current) => !current)
  }

  return (
    <div
      className={[
        className,
        'flex h-full overflow-hidden relative',
        // TODO: Remove when styling issues are resolved
        // - [ ] Remove x-overflow, let Prose handle this
      ].join(' ')}
    >
      <SideBarContainer
        initialSideBar={initialSideBar}
        toc={<TOC doc={doc} headings={extractNestedHeadings(content)} />}
      />

      <div className="flex flex-row h-full w-full overflow-auto pt-14">
        {main()}
      </div>

      {/*<div className="grow flex overflow-x-scroll">
        <aside
          className={`bg-gray-50 border-gray-300 h-full w-[25ch] transition ${
            showComments
              ? 'shadow-lg shadow-black/50 border-l'
              : 'translate-x-full transition'
          } hidden md:flex md:absolute md:right-0 flex-col shrink-0 grow-0 pt-2 `}
        >
          <div className="border-b px-2 flex justify-between items-center py-1">
            <h3 className="font-bold">Comments</h3>
            <button
              onClick={handleCommentClick}
              className="shrink-0 group hover:bg-gray-200 px-2 rounded-md py-1 relative w-fit"
            >
              <ChevronDoubleRightIcon className="w-5 h-5 hover:fill-c-blue-main" />
              <span
                className={[
                  'absolute',
                  'right-0',
                  'top-8',
                  'p-2',
                  'rounded-md',
                  'whitespace-nowrap ',
                  '-z-10',
                  'text-white',
                  'text-xs',
                  'bg-primary-main',
                  'invisible',
                  'transiton',
                  'group-hover:visible',
                  'group-hover:transtion',
                  'group-hover:z-0',
                ].join(' ')}
              >
                Close Comments
              </span>
            </button>
          </div>
          <div className="px-2 py-2 text-xs">
            <p>The quick brown fox jumps over the lazy dog</p>
          </div>
        </aside>
        </div>*/}

      <div
        className={[
          'absolute top-2 right-2',
          'self-end mb-1 flex justify-end gap-3',
        ].join(' ')}
      >
        <SwitchMode enabled={mode} setEnabled={(value) => setMode(value)} />
        <div
          className={`hidden md:flex hover:text-c-blue-hover mr-3 ${
            showComments ? 'text-c-blue-main' : ''
          }`}
        >
          <ContentContainerButton
            className="px-4 opacity-[0.5] hover:opacity-[1]"
            iconStyles="w-5 shrink-0"
            onClickEvent={handleCommentClick}
            Icon={ChatBubbleLeftEllipsisIcon}
          />
        </div>
      </div>
    </div>
  )
}

export default ContentContainer
