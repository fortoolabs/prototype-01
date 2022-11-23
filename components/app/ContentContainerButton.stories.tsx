import { ComponentStory, ComponentMeta } from '@storybook/react'

import ContentContainerButton from './ContentContainerButton'

import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/20/solid'

export default {
  title: 'Application/Molecules/ContentContainerButton',
  component: ContentContainerButton,
} as ComponentMeta<typeof ContentContainerButton>

const Template: ComponentStory<typeof ContentContainerButton> = () => {
  return (
    <ContentContainerButton
      className="px-4 opacity-[0.5] hover:opacity-[1]"
      iconStyles="w-5 shrink-0"
      onClickEvent={(e: any) => console.log(e)}
      Icon={ChatBubbleLeftEllipsisIcon}
    />
  )
}

export const Default = Template.bind({})
Default.args = {}
