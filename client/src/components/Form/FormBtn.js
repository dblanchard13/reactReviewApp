
import React from 'react'

export const FormBtn = props => (
  <button style={{ float: 'right', marginBottom: 10 }} className='btn btn-success' { ...props }>
    { props.children }
  </button>
)
