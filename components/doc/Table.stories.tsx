import { ComponentStory, ComponentMeta } from '@storybook/react'

import Table from './Table'

const tableData = {
  title: 'My Favorite jedi',

  content: [
    {
      name: 'obiwan',
      rank: 'council member',
      saberColor: 'blue',
      Nemesis: 'Darth maul',
    },
    {
      name: 'Luke',
      rank: 'Grand Master',
      saberColor: 'blue',
      Nemesis: 'Darth Sidious',
    },
    {
      name: 'Anakin',
      rank: 'Master',
      saberColor: 'blue',
      Nemesis: 'Anakin',
    },
    {
      name: 'Yoda',
      rank: 'Grand Master',
      saberColor: 'green',
      Nemesis: 'Darth Sidious',
    },
  ],
}
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Document/Table',
} as ComponentMeta<typeof Table>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />
export const DefaultTable = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DefaultTable.args = {
  data: tableData,
}
