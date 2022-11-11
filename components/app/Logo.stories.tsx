import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import LogoGenesis from './Logo'

export default {
  title: 'Application/Atoms/Logo-Genesis',
  component: LogoGenesis,
} as ComponentMeta<typeof LogoGenesis>

const Template: ComponentStory<typeof LogoGenesis> = (args) => (
  <LogoGenesis {...args} />
)

export const Primary = Template.bind({})

Primary.args = {
  id: '123',
}
