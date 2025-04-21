import React, { useEffect, useState } from 'react'
import { BsChatDots, BsPeople } from 'react-icons/bs';
import { useParams } from 'react-router-dom';

const users = ({ sock }) => {


    const {userid} = useParams()
    const [chatroom, stateChatroom ] = useState('')
    const [chatusers, stateChatusers ] = useState([])

    
    useEffect(() => {
        sock?.on('roomUsers', ({ room, users }) => {
            stateChatroom(room);
    
            // Move the current user to the top of the list
            const sortedUsers = users.sort((a, b) => {
            
                if (a._id === userid) return -1;
                if (b._id === userid) return 1;
               
            });
    
            stateChatusers(sortedUsers);
        });
    }, [sock, userid]);

    return (
        <div className='usercontainer'>

            <div className='chatroom'>
                <span><BsChatDots size={20} className='m-4 text-red-600' /></span><h1 className='-mt-8 ml-12 text-red-600 font-semibold'>Chat Room</h1>
                <p className='ml-12 mt-4'>{chatroom}</p>

            </div>


            <span><BsPeople size={20} className='m-4 text-red-600' /></span><h1 className='-mt-8 ml-12 text-red-600 font-semibold'>Users</h1>
            
            {chatusers && chatusers.map((alluser, index) => (
                <div key={index} className='chatusers'>

                   <p className='ml-12 mt-4'>{alluser._id === userid ? <p className='text-red-500'>You</p> : alluser.username}</p>
                </div>

            ))}


        </div>
    )
}

export default users