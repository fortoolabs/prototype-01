import { Row } from 'components/View'
import { Main } from 'components/View'

import { renderElement } from 'core/renderer'

import { FDocument } from 'core/types'

export type LinearProps = {
  // TODO: Revert to make this mandatory, optional doc is a hack to move this forward
  doc?: FDocument
  // TODO: Remove in preference of theming (as outlined below)
  serif: boolean
}

export default function LinearView({ serif, doc }: LinearProps) {
  // TODO: Use theming context/provider for this or define own
  // https://reactician.com/articles/sharing-state-between-nextjs-page-navigations-using-react-contexts
  if (doc === undefined) {
    // TODO: Implement empty board view
    return <span>noop</span>
  } else {
    const { content } = doc
    return (
      <Row gap="small" pad="small" justify="start">
        <Main style={{ fontFamily: serif ? 'Times' : 'inherit' }}>
          {/* iterate over json, build right component */}
          {content.map((el, i) => renderElement(el, i))}
        </Main>
      </Row>
    )
  }
}
