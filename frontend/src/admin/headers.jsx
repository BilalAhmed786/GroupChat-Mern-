import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'



const headers = () => {

    const navigate = useNavigate()
    
    const logoutHandler = ()=>{

        axios.get('/api/auth/logout')
    
        .then(()=>{

            navigate('/')

        })
        .catch((error)=>{
            
            console.log(error)
        

        })
            

    }


  return (
    <div className='p-4 h-24 text-sm bg-slate-50 flex justify-between'>
        <h1 className='text-black mt-5 text-2xl font-semibold ml-5'>Saif Chat</h1>
        <button onClick={logoutHandler} className='text-black text-lg font-semibold mr-5'>Logout</button>
        </div>
  )
}

export default headers