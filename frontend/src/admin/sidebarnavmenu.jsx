import React from 'react';
import { BsPlusCircle, BsHouseDoor, BsPeople, BsChatDots, BsSlashCircle, BsChat } from 'react-icons/bs';


const SidebarnavMenu = () => {
  return (
    <div className="h-screen w-64 bg-white text-black flex flex-col">
     
      <nav className="flex-1 font-thin p-4 text-sm border-r">
        <ul>
          <li className="p-4 hover:bg-gray-100 border-b">
           <span> <BsPlusCircle className="text-xl m text-red-500 float-left p-1" /></span> <a className='text-black font-normal' href="/createchatroom">Create Room</a>
          </li>
          <li className="p-4 hover:bg-gray-100 border-b">
          <span> <BsHouseDoor className="text-xl m text-red-500 float-left p-1" /></span> <a className='text-black font-normal' href="/allchatrooms">Rooms</a>
          </li>
          <li className="p-4 hover:bg-gray-100 border-b">
          <span> <BsPeople className="text-xl m text-red-500 float-left p-1" /></span>  <a className='text-black font-normal' href="/allusers">Users</a>
          </li>
          <li className="p-4 hover:bg-gray-100 border-b">
          <span> <BsChatDots className="text-xl m text-red-500 float-left p-1" /></span> <a className='text-black font-normal' href="/allmessages">Chat Messages</a>
          </li>
          <li className="p-4 hover:bg-gray-100 border-b">
          <span> <BsSlashCircle className="text-xl m text-red-500 float-left p-1" /></span> <a className='text-black font-normal' href="/blockusers">Block Users</a>
          </li>
          <li className="p-4 hover:bg-gray-100 border-b">
          <span> <BsChat className="text-xl m text-red-500 float-left p-1" /></span>  <a className='text-black font-normal' href="/chatroomlist">Chat Rooms</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SidebarnavMenu;
