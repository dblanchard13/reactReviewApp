
import React from 'react'
import './List.css'

export const List = ({ children }) => (
  <div className='list-overflow-container'>
    <ul className='list-group'>
      { children }
    </ul>
  </div>
)

