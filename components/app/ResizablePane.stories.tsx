import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import ResizablePane from './ResizablePane'

const ExampleContent = () => (
  <div>
    <p>
      Where does it come from? Contrary to popular belief, Lorem Ipsum is not
      simply random text. It has roots in a piece of classical Latin literature
      from 45 BC, making it over 2000 years old. Richard McClintock, a Latin
      professor at Hampden-Sydney College in Virginia, looked up one of the more
      obscure Latin words, consectetur, from a Lorem Ipsum passage, and going
      through the cites of the word in classical literature, discovered the
      undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of
      &quot;de Finibus Bonorum et Malorum &quot; (The Extremes of Good and Evil)
      by Cicero, written in 45 BC. This book is a treatise on the theory of
      ethics, very popular during the Renaissance. The first line of Lorem
      Ipsum, &quot;Lorem ipsum dolor sit amet.. &quot;, comes from a line in
      section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is
      reproduced below for those interested. Sections 1.10.32 and 1.10.33 from
      &quot;de Finibus Bonorum et Malorum &quot; by Cicero are also reproduced
      in their exact original form, accompanied by English versions from the
      1914 translation by H. Rackham.
    </p>
  </div>
)

export default {
  title: 'Application/Resizable',
  component: ResizablePane,
} as ComponentMeta<typeof ResizablePane>

const Template: ComponentStory<typeof ResizablePane> = (args) => (
  <ResizablePane {...args} />
)

export const RightResizablePane = Template.bind({})
RightResizablePane.args = {
  children: <ExampleContent />,
  handlePosition: 'e',
}
const LeftResizablePane = Template.bind({})
LeftResizablePane.args = {
  children: <ExampleContent />,
  handlePosition: 'w',
}
export const SidebySidePanes = () => (
  <div className="flex ">
    <ResizablePane handlePosition="e" width={600} className="shrink-0">
      <ExampleContent />
    </ResizablePane>
    <ExampleContent />
  </div>
)
