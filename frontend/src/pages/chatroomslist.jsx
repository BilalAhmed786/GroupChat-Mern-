import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BsPeople } from 'react-icons/bs';
import Headers from './headers';
import Footer from './footer';
import { SocketContext } from '../contextapi/contextapi'

const ChatroomList = () => {

  const navigate = useNavigate();
  const [chatroomdata, setRoomdata] = useState([]);
  const [userdata, setUserdata] = useState(null);
  const [searchroom, setSearchRoom] = useState('');
  const [roomusers, setRoomUsers] = useState([]);
  const [blockusers, setBlockUsers] = useState([]);
  const { sock } = useContext(SocketContext)
  
  useEffect(() => {
    axios.get(`/api/admin/createroom?search=${searchroom}`)
      .then((response) => {
        setRoomdata(response.data);
        // sock?.emit('roomdata',response.data)
      })
      .catch((error) => {
        console.log(error);
      });

    axios.get('/api/auth/authorize')
      .then((response) => {
        setUserdata(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, [searchroom]);

  useEffect(() => {
    axios.get('/api/admin/roomuser')
      .then((response) => {
        setRoomUsers(response.data);
        console.log(response.data)
        // sock?.emit('roomusers',response.data)
      })
      .catch((error) => {
        console.log(error);
      });

    axios.get('/api/admin/blockuser')
      .then((result) => {
        setBlockUsers(result.data);
        sock?.emit('blockusers', result.data)
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  //socket working

  useEffect(() => {

    const handleRoomuser = (data) => {

   setRoomUsers((prev) => {
        const userExists = prev.some((user) => user.user === data.user); 

        if (userExists) {
          return [...prev]; // Just return previous if user already exists
        } else {
          return [...prev, data]; // Add new user if not exists
        }
      });


    }


    const handleLeavechat = (data) => {
     console.log(data)

      setRoomUsers((prev) => prev.filter((user) => user.user !== data.userid))
    
    }


    const handleBlockuser = (data) => {


      setBlockUsers((prev) => {

        const userexist = prev.some((user) => user.user._id === data.user._id)

        if (userexist) {

          return prev.filter((user) => user.user._id !== data.user._id)


        } else {

          return [...prev, data]
        }



      })

    }


    const handleCreateroom = (data)=>{

          setRoomdata((prev)=>{

                return [...prev,data]

          })

    }

    const handleUpdateroom = (data) => {
      setRoomdata((prev) => {
        return prev.map((room) => {
          return room._id === data._id
            ? {
                ...room,
                name: data.name,
              }
            : room;
        });
      });
    };
    const handleDeleteroom = (data) => {
      setRoomdata((prev) => {
        return prev.filter((room)=>room._id !== data._id)
      });
    };

    const handleDeleterooms = (data) => {
      const idsToDelete = data.map((room) => room._id);
    
      setRoomdata((prev) => {
        return prev.filter((room) => !idsToDelete.includes(room._id));
      });
    };
    

    sock?.on('roomusers', handleRoomuser)
    sock?.on('leavechat', handleLeavechat)
    sock?.on('blockuserid', handleBlockuser)
    sock?.on('createRoom', handleCreateroom)
    sock?.on('updateRoom', handleUpdateroom)
    sock?.on('deleteRoom', handleDeleteroom)
    sock?.on('deleteRooms', handleDeleterooms)



    return () => {


      sock?.off('roomusers', handleRoomuser)
      sock?.off('leavechat', handleLeavechat)
      sock?.off('blockuserid', handleBlockuser)
      sock?.off('createRoom', handleCreateroom)
      sock?.off('updateRoom', handleUpdateroom)
      sock?.off('deleteRooms', handleDeleterooms)
    }

  }, [sock])


  return (
    <>
      <Headers />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl text-center font-bold mb-6 text-black">Chatrooms</h1>
        <Link to="/admindashboard">
          {userdata && userdata.role === 'admin' ? <span className='text-sm text-blue-500 float-right mr-6'>Admin Dashboard</span> : ""}
        </Link>
        <input
          className='block h-12 text-center text-sm w-1/2 m-auto outline-0 border'
          type='text'
          onChange={e => setSearchRoom(e.target.value)}
          placeholder='Search room'
        />
        <div className="bg-white shadow-md rounded-lg p-6">
          <ul>
            {chatroomdata && chatroomdata.map((room) => {
              const usersInRoom = roomusers && roomusers.filter(user => user.room?.name === room.name);
              const isBlocked = blockusers.some(blockedUser => blockedUser.roomname === room.name && blockedUser.user._id === userdata?._id);

              return (
                <li key={room._id} className="flex justify-between text-black items-center py-2 border-b">
                  <span className="text-lg">{room.name}</span>
                  <div className='flex items-center justify-end w-11/12 text-sm -mt-10 -mr-8'>
                    <span>{usersInRoom ? usersInRoom.length : ''}</span>
                    <BsPeople className="text-lg text-black ml-1" />
                  </div>
                  {userdata && (
                    <div>
                      {isBlocked ? (
                        <button className="bg-gray-600 text-xl text-white px-4 py-2 rounded cursor-not-allowed" disabled>
                          Join
                        </button>
                      ) : (
                        <Link to={`/saifchat/${room._id}/${userdata._id}`}>
                          <button className="bg-red-600 text-xl text-white px-4 py-2 rounded hover:bg-blue-600">
                            Join
                          </button>
                        </Link>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ChatroomList;
