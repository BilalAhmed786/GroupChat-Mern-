import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Contextapi from './contextapi/contextapi';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Contextapi>
    <App />
      <ToastContainer />
    </Contextapi>
  </>,
)
