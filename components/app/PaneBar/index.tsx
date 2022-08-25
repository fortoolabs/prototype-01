import React from 'react'

import { useState } from 'react'

import { Row } from 'components/View'
import Breadcrumb from './Breadcrumb'

const PaneBar = ({ isLoading, isFailing, boardView, setBoardView }) => {
	return (
		<Row justify="between" align="middle" className="h-14 shadow-md border-b border-gray-200">
		 <Row className="px-8">
		 <Breadcrumb boardView={boardView} />
         <pre className="self-center px-4">
          🤔
          {isLoading ? '⏳' : ''}
          {isFailing ? '💥' : ''}
        </pre>
        </Row>
        <button className="px-8" onClick={() => setBoardView(!boardView)}>toggle view</button>
      </Row>
	)
}

export default PaneBar
