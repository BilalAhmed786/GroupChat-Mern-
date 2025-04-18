import React from 'react'
import Messages from './messages'

const chat = ({sock,chatroomid,userid}) => {
  return (
    <div className='chat'>
        <Messages sock={sock} chatroomid={chatroomid}  userid={userid}/>
       
    </div>
  )
}

export default chat