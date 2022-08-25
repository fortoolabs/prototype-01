import React from 'react'

type SidebarProps = {
  children: any
}

const Sidebar = ({children}: SidebarProps) => {
  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex-1 flex flex-col min-h-0 bg-black dark:border-r dark:border-gray-700">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="text-gray-300 flex items-center mt-2 flex-shrink-0 px-4">
              {/*<img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                alt="Workflow"
              />*/}
              <b>TABLE OF CONTENT</b>
            </div>
              <div className="px-4 mt-2 space-y-1">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
