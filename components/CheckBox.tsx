import { CheckBox as GrommetCheckBox } from 'grommet'

import Paragraph from 'components/doc/Paragraph'
import { Row } from 'components/View'

export type CheckBoxProps = {
  checked?: boolean
  indeterminate?: boolean
}

export default function CheckBox({ checked, indeterminate }: CheckBoxProps) {
  return (
    <Row gap="medium">
      <GrommetCheckBox checked={checked} indeterminate={indeterminate} />
      <Paragraph>Some item</Paragraph>
    </Row>
  )
}
