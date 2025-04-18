import React, { useEffect, useState } from 'react'
import { BsChatDots, BsPeople } from 'react-icons/bs';

const users = ({ sock }) => {

    const [chatroom, stateChatroom ] = useState('')
    const [chatusers, stateChatusers ] = useState([])
    useEffect(() => {

        const socket = sock.connect()

        socket.on('roomUsers', ({ room, users }) => {

            stateChatroom(room)
            stateChatusers(users)
           
        });

    }, [])

    return (
        <div className='usercontainer'>

            <div className='chatroom'>
                <span><BsChatDots size={20} className='m-4 text-red-600' /></span><h1 className='-mt-8 ml-12 text-red-600 font-semibold'>Chat Room</h1>
                <p className='ml-12 mt-4'>{chatroom}</p>

            </div>


            <span><BsPeople size={20} className='m-4 text-red-600' /></span><h1 className='-mt-8 ml-12 text-red-600 font-semibold'>Users</h1>
            
            {chatusers && chatusers.map((alluser, index) => (
                <div key={index} className='chatusers'>

                   <p className='ml-12 mt-4'>{alluser}</p>
                </div>

            ))}


        </div>
    )
}

export default users