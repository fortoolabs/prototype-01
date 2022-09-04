import { ComponentStory, ComponentMeta } from '@storybook/react'
import useState from 'storybook-addon-state'

import NavigationBar from './NavigationBar'

export default {
  title: 'Layouts/Navigation',
  component: NavigationBar,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof NavigationBar>

const Template: ComponentStory<typeof NavigationBar> = (args) => {
  const [isDark, setDark] = useState('dark mode', false)
  const [isSerif, setSerif] = useState('serif font', false)

  return (
    <NavigationBar
      {...args}
      isDark={isDark}
      setDarkMode={setDark}
      serif={isSerif}
      setSerif={setSerif}
    />
  )
}

export const Primary = Template.bind({})
Primary.args = {}
