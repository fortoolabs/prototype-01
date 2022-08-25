import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import FallbackBlock from './FallbackBlock'

const table = `
 | Name                  | Value |
 |-----------------------+-------|
 | A                     |    12 |
 | A ladkajfsdlkfjalsdkf |   233 |
 
`

const randomCode= `
  if(ground = high){
     obiwanWins = true;
     anakinLosesLimbs= true;
  }
  else{
    anakinWins = true;
  }

`
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/FallbackBlock',
  component: FallbackBlock,
} as ComponentMeta<typeof FallbackBlock>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FallbackBlock> = (args) => <FallbackBlock {...args} />

export const TableFallback = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TableFallback.args = {
    border: true,
    children: table
}
export const RandomCodeFallback = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
RandomCodeFallback.args = {
    border: false,
    children: randomCode
}

