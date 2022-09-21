import { ComponentStory, ComponentMeta } from '@storybook/react'
import useState from 'storybook-addon-state'

import SwitchMode from './SwitchMode'

export default {
  title: 'Application/ModeSwitch',
  component: SwitchMode,
} as ComponentMeta<typeof SwitchMode>

// FIX: This is broken, the addon state doesn't seem to respond
const Template: ComponentStory<typeof SwitchMode> = () => {
  const [mode, setMode] = useState('mode', 'prose')

  return <SwitchMode enabled={mode} setEnabled={(value) => setMode(value)} />
}

export const Default = Template.bind({})
Default.args = {}
