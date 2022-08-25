import React from 'react'
import { Breadcrumb as FBreadcrumb } from 'flowbite-react'

const Breadcrumb = ({ boardView }) => {
  return (
    <FBreadcrumb aria-label="Breadcrumb" className="self-center">
      <FBreadcrumb.Item href="#">
        My Document
      </FBreadcrumb.Item>
      {!!boardView && <FBreadcrumb.Item href="#">Heading</FBreadcrumb.Item>}
      {!!boardView && <FBreadcrumb.Item>Subheading in scope</FBreadcrumb.Item>}
    </FBreadcrumb>
  )
}

export default Breadcrumb
