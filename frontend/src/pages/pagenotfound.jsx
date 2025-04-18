import React from 'react';

const NotFound = () => {
  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-2xl text-gray-600 mb-4">Page Not Found</p>
        <p className="text-gray-500 mb-8 text-lg">The page you're looking for doesn't exist or has been moved.</p>
        <a href="/" className="bg-blue-500 text-xl text-white px-4 py-2 rounded hover:bg-blue-600">Go Home</a>
      </div>
    </div>
  );
}

export default NotFound;
