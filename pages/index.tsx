import { useState } from 'react'

import { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'

import { defaultTarget as target } from 'core/helpers'

import { CodeBracketIcon } from '@heroicons/react/20/solid'

import { extractNestedHeadings, FDocument } from 'core/parser'

import Board from 'components/Board'
import Prose from 'components/mode/Prose'

import TOC from 'components/app/TOC'

import SwitchMode from 'components/app/SwitchMode'
import { getDoc } from 'pages/api/doc/index'

import Layout, {
  HorizontalDiptychWithAside,
} from 'components/app/LayoutNarrowSidebar'
import About from 'components/app/About'

type HomePageProps = {
  url?: string
  handle: string
  doc?: FDocument
  isFailing: boolean
  reason?: string
}
// TODO: Show notification on isFailing
// TODO: Add button with link to URL
export const HomePage: NextPage<HomePageProps> = ({ url, doc }) => {
  const [mode, setMode] = useState('prose')
  const [showModal, setShowModal] = useState(false)

  const session = {
    name: 'David Asabina',
    handle: 'vid@bina.me',
    avatarPath:
      'https://pbs.twimg.com/profile_images/1276458607702241282/eAH3B2eT_400x400.jpg',
  }

  if (doc === undefined) {
    // TODO: Implement empty loading views
    return <span>This scrappy prototype stinks!</span>
  }

  const { title, content } = doc

  return (
    <Layout
      setShowModal={setShowModal}
      viewControl={
        <div className="flex items-center">
          <a
            className={
              'inline-flex items-center rounded-md border border-gray-200 px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2'
            }
            href={url}
            rel="noopener noreferrer"
            target="_blank"
          >
            <CodeBracketIcon
              className="-ml-1 mr-2 h-5 w-5"
              aria-hidden="true"
            />
            Source
          </a>
          <SwitchMode
            // TODO: Remove for tabs or something more appropriate
            className="ml-4"
            enabled={mode}
            setEnabled={(value) => setMode(value)}
          />
        </div>
      }
      {...session}
      sessionOptions={[]}
      navigationOptions={[]}
      menuOptions={[]}
      toc={<TOC doc={doc} headings={extractNestedHeadings(content)} />}
    >
      <HorizontalDiptychWithAside
        main={(() => {
          switch (mode) {
            case 'kanban':
              return <Board doc={doc} />
            case 'prose':
            default:
              return <Prose isSerif={false} doc={doc} />
          }
        })()}
        aside={<TOC doc={doc} headings={extractNestedHeadings(content)} />}
      />

      <Head>{title && <title>{title}</title>}</Head>
      {showModal && (
        <About
          showModal={showModal}
          setShowModal={setShowModal}
          entries={[
            {
              title: 'Our legal obligations?',
              content:
                "If you're unhappy with your purchase for any reason, email us within 90 days and we'll refund you in full, no questions asked.",
            },
            {
              title: 'What are the tools involved?',
              content:
                'We tend to use the latest tenchnologies on these project. And they are reactjs, nextjs etc.',
            },
          ]}
          version={process.env.VERCEL_GIT_COMMIT_SHA || 'unknown version'}
        />
      )}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (): Promise<{
  props: HomePageProps
}> => {
  const [status, payload] = await getDoc(target)
  const { handle } = payload

  if (handle === undefined) {
    throw new Error('Handle-less document')
  }

  return {
    props: {
      ...payload,
      handle,
      isFailing: status !== 200,
    },
  }
}

export default HomePage
