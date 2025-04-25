import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { SocketContext } from '../contextapi/contextapi';

const Chatroomprotect = (props) => {
  
  const {Component} = props
const [data,userData]=useState('')
  const [userremove,setUserremove] = useState('')
  const {sock} = useContext(SocketContext)
const navigate = useNavigate()
   
useEffect(()=>{


  const userdet = async()=>{
 
    try{

        const user = await axios.get('/api/auth/authorize')
    
        if(user.data.msg === 'invalid user'){
     
        navigate('/')
     
        }else{

          navigate('/chatroomlist')
        }
      
        userData(user.data)

      

     }catch(error){

        console.log(error)
    }
      
    
    
      }


      userdet()


},[userremove])
//for socket 

useEffect(()=>{

const handleUserremove =  (id)=>{
console.log(id)
  setUserremove(id)

}


sock?.on('userDelete',handleUserremove)
return ()=>{

sock?.off('userDelete',handleUserremove)
}

},[])
 

return (
    <>
    <Component/>
    </>
    
  )
}

export default Chatroomprotect