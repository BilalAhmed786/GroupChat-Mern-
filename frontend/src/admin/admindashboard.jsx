import React from 'react'
import Sidebar from './sidebarnavmenu';
import Headers from './headers';
import Footer from './footer';

const admindashboard = () => {

  return (

    <>
      <Headers />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-10">
        <h1 className="text-2xl font-bold text-gray-800">Welcome, Admin</h1>
        <p className="mt-4 text-gray-600 text-sm">Manage your dashboard and oversee the platform from here.</p>
       
        </div>
      </div>
      <Footer />
    </>
  )
}

export default admindashboard