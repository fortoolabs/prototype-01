import { useState } from 'react'
import { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'

import { defaultTarget as target } from 'core/helpers'

import { LinkIcon } from '@heroicons/react/20/solid'

import { extractNestedHeadlines, FDocument } from 'core/parser'

import Board from 'components/Board'
import Prose from 'components/mode/Prose'

import TOC from 'components/app/TOC'
import Toggle from 'components/app/Toggle'

import { getDoc } from 'pages/api/doc/index'

import Layout, {
  HorizontalDiptychWithAside,
} from 'components/app/LayoutNarrowSidebar'

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
      viewControl={
        <div className="flex items-center">
          <a
            className={
              'inline-flex items-center rounded-md border border-transparent bg-pink-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2'
            }
            href={url}
          >
            <LinkIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Visit Source
          </a>
          <Toggle
            // TODO: Remove for tabs or something more appropriate
            className="ml-4"
            isEnabled={mode == 'prose'}
            setEnabled={() => setMode(mode == 'prose' ? 'kanban' : 'prose')}
          />
        </div>
      }
      {...session}
      sessionOptions={[]}
      navigationOptions={[]}
      menuOptions={[]}
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
        aside={<TOC headings={extractNestedHeadlines(content)} />}
      />
      {title && (
        <Head>
          <title>{title}</title>
          <script
            defer
            data-domain="proto.formation.tools"
            src="https://plausible.io/js/plausible.js"
          ></script>
        </Head>
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

export default Home
