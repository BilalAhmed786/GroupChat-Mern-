import React, { useContext, useEffect } from 'react'
import Sidebar from '../roomcomponents/sidebar'
import Chat from '../roomcomponents/chat'
import Topbar from '../roomcomponents/topbar'
import Input from '../roomcomponents/input'
import { useParams } from 'react-router-dom';
import {SocketContext} from '../contextapi/contextapi'


const chatroomlist = () => {

  const { chatroomid, userid } = useParams();
  const {sock}= useContext(SocketContext)

  return (
    <div className='wrapperchat'>
      <div className='topbarcontainer'>
        <Topbar />
      </div>
      <div className='home'>
        <div className='chatcontainer'>
          <Sidebar sock={sock} />
         <div className='chat'>
          <Chat sock={sock} chatroomid={chatroomid} userid={userid} />
          <Input sock={sock} chatroomid={chatroomid} userid={userid} />
          </div>
        </div>
       
      </div>

    </div>
  )
}

export default chatroomlist