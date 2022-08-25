import React from 'react'

import { useState } from 'react'

import { Row } from 'components/View'
import Breadcrumb from './Breadcrumb'

const PaneBar = ({ isLoading, isFailing, boardView, setBoardView }) => {
	return (
		<Row justify="between" align="middle" className="h-14">
		 <Breadcrumb boardView={boardView} />
         <pre>
          🤔
          {isLoading ? '⏳' : ''}
          {isFailing ? '💥' : ''}
        </pre>
        <button onClick={() => setBoardView(!boardView)}>toggle view</button>
      </Row>
	)
}

export default PaneBar
