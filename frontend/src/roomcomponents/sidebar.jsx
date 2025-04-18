import React from 'react'
import Users from './users'

const sidebar = ({sock}) => {

return (
    <div className='sidebar'>

      <Users sock ={sock} />

    </div>
  )
}

export default sidebar