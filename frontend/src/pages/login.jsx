
import React, { useEffect, useState } from 'react';

import axios from 'axios'; // Import Axios
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userdetail, setuserdetail] = useState('')

console.log(userdetail)
  const userdet = async () => {

    try {

      const user = await axios.get('/api/auth/authorize')
      if (user.data.username) {

        setuserdetail(user.data.role)

      }

    } catch (error) {

      console.log(error)
    }



  }





  useEffect(() => {

    userdet()


    if (userdetail === 'chatuser') {

      navigate('/chatroomlist')
    }
    else if (userdetail === 'admin') {

      navigate('/admindashboard')

    }else{
      navigate('/')
    }


  }, [userdetail])





  const handleSubmit = async (event) => {

    event.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', { email, password });


      setuserdetail(response.data)

    }

    catch (error) {

      if (error.response.data === 'Missing credentials') {

        toast.error('All fields requried')

      } else {

        toast.error(error.response.data)

      }

    }

    // Add your login logic here
  };

  return (


    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="email"
                type="email"
                autoComplete="username"
                className="mb-5 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={email}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">


            <div className="text-sm">
              <a href="/forgetpassword" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {/* Heroicon name: lock-closed */}
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M4 8V6a4 4 0 118 0v2h1a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2h1zm3-2v2h4V6a2 2 0 10-4 0zm10 5v6a4 4 0 01-4 4H5a4 4 0 01-4-4v-6a4 4 0 014-4h1V6a6 6 0 1112 0v1h1a4 4 0 014 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Sign in
            </button>
          </div>
          <div>
            <a
              href="/register"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {/* Heroicon name: lock-closed */}
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M4 8V6a4 4 0 118 0v2h1a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2h1zm3-2v2h4V6a2 2 0 10-4 0zm10 5v6a4 4 0 01-4 4H5a4 4 0 01-4-4v-6a4 4 0 014-4h1V6a6 6 0 1112 0v1h1a4 4 0 014 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Register
            </a>
          </div>

        </form>
      </div>
    </div>

  );
};

export default Login;
