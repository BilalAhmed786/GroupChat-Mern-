import React from 'react'
import { useNavigate } from 'react-router-dom'

const topbar = () => {

  const navigate = useNavigate()
  const levechathandle = async (e) => {

    navigate('/chatroomlist')


  }
  return (
    <div className='topbar'>

      <h1 className='m-7 text-cyan-950 font-bold text-2xl'>Saif Chat</h1>
      <button onClick={levechathandle} className='bg-red-600 text-xs m-5 p-2 pt-0 pb-0 text-white font-bold rounded'>Leave Chat</button>
    </div>
  )
}

export default topbar