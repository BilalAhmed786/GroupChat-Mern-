import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Chatroomprotect = (props) => {
  const {Component} = props
const [data,userData]=useState('')

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


},[])

 

return (
    <>
    <Component/>
    </>
    
  )
}

export default Chatroomprotect