import { ComponentStory, ComponentMeta } from '@storybook/react'
import useState from 'storybook-addon-state'

import Toggle from './Toggle'

export default {
  title: 'Application/Toggle',
  component: Toggle,
} as ComponentMeta<typeof Toggle>

// FIX: This is broken, the addon state doesn't seem to respond
const Template: ComponentStory<typeof Toggle> = (args) => {
  const [value, setValue] = useState('toggleValue', true)

  return <Toggle {...args} isEnabled={value} setEnabled={setValue} />
}

// FIX: Rendering of components seems broken in Docs view
// Canvas view works sometimes but the ring colors or toggle colors don't always take
export const Basic = Template.bind({})
Basic.args = {}

export const ColoredYellow = Template.bind({})
ColoredYellow.args = { isEnabled: true, activeColor: 'yellow' }

export const ColoredBlue = Template.bind({})
ColoredBlue.args = { isEnabled: true, activeColor: 'blue' }

export const ColoredRed = Template.bind({})
ColoredRed.args = { isEnabled: true, activeColor: 'red' }

export const ColoredPink = Template.bind({})
ColoredPink.args = { isEnabled: true, activeColor: 'pink' }

export const ColoredGreen = Template.bind({})
ColoredGreen.args = { isEnabled: true, activeColor: 'green' }

export const ColoredSlate = Template.bind({})
ColoredSlate.args = { isEnabled: true, activeColor: 'slate' }
