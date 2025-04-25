import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const topbar = ({chatroomid,userid,sock}) => {

  
  const navigate = useNavigate()
  const [userId,setUserid] = useState('')

  const levechathandle = async (e) => {

   
    navigate('/chatroomlist')


  }

//incase userinside chatroom and blocked by admin
  if(userId === userid ){

      levechathandle()

  }

    useEffect(()=>{

      const handleBlockuser = (data)=>{

          setUserid(data.user._id)

      }

      const handleUserremove = (id)=>{
        
        setUserid(id)

      }

      sock?.on('blockuserid',handleBlockuser)
      sock?.on('userDelete',handleUserremove)


        return ()=>{

        sock?.off('blockuserid',handleBlockuser)
        sock?.off('userDelete',handleUserremove)

      }
    },[])

  return (
    <div className='topbar'>

      <h1 className='m-7 text-cyan-950 font-bold text-2xl'>Saif Chat</h1>
      <button onClick={()=>levechathandle(chatroomid,userid)} className='bg-red-600 text-xs m-5 p-2 pt-0 pb-0 text-white font-bold rounded'>Leave Chat</button>
    </div>
  )
}

export default topbar