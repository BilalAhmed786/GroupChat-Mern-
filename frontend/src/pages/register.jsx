// src/RegisterForm.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const RegisterForm = () => {

  const navigate = useNavigate()
  const [userdetail,setuserdetail]= useState('')

//  const userdet = async()=>{
 
//     const user = await axios.get('/success')


//     if(user.data.username){

//       setuserdetail(user.data.username)

//     }else{

//       setuserdetail('')
//     }


//   }
 
//   useEffect(() => {


//     userdet();
   
   
//     if(userdetail){

//       navigate('/chat')
//     }else{

//       navigate('/')
//     }

   
//   }, [userdetail])

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    retypepassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/register', formData);
   
            toast.success(response.data.msg)
    
    } catch (error) {
      
        if (error.response && error.response.status === 400) {
           
            error.response.data.valid.map((validation)=>(

                toast.error(validation)


            ));
    }



    };
  }
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Register</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                id="username"
                name="username"
                type="text"

                value={formData.username}
                onChange={handleChange}
                className="mb-5 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="mb-5 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"

                value={formData.password}
                onChange={handleChange}
                className="mb-5 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Retype Password</label>
              <input
                id="retypepassword"
                name="retypepassword"
                type="password"

                value={formData.retypepassword}
                onChange={handleChange}
                className="mb-5 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Retype Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 mb-5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
            <a
              href="/"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;