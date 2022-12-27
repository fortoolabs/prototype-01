import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import useState from 'storybook-addon-state'

import About from './About'

export default {
  title: 'Application/Organisms/Layouts/About',
  component: About,
} as ComponentMeta<typeof About>

const Template: ComponentStory<typeof About> = (args) => {
  const [showModal, setShowModal] = useState('Show About', true)
  return (
    <div>
      <button
        type="button"
        className={
          'inline-flex items-center border-none rounded-md border text-gray-400 hover:text-gray-500'
        }
        onClick={() => setShowModal(true)}
      >
        <span className="sr-only">Info about formation tools</span>
        <InformationCircleIcon className="h-6 w-6" aria-hidden="true" />
      </button>
      <About {...args} showModal={showModal} setShowModal={setShowModal} />
    </div>
  )
}
export const DefaultContentView = Template.bind({})
