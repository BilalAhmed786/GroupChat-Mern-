import React, { useEffect } from 'react'
import Sidebar from '../roomcomponents/sidebar'
import Chat from '../roomcomponents/chat'
import Topbar from '../roomcomponents/topbar'
import Input from '../roomcomponents/input'
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
const sock = io('http://localhost:4000', { autoConnect: false }); //socket conneciton establish in parent

const chatroomlist = () => {

  const { chatroomid, userid } = useParams();

  useEffect(() => {

    const socket = sock.connect();  //conenct socket in parent


    return () => {

      socket.disconnect();//disconnect socket from parent
    }

  }, []);
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