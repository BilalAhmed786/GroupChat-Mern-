import './App.css'
//auth pages
import Registeration from './pages/register'
import Login from './pages/login'
import Forgetpassword from './pages/forgetpass'
import ResetPassword from './pages/resetpass'
//chat room pages
import Chatroom from './pages/chatroom'
import Chatroomlist from './pages/chatroomslist'
import Chatroomprotect from './protected/chatroomprotect'
import Adminapiprotect from './protected/adminapiprotect'
// admin pages
import Admindashboard from './admin/admindashboard'
import AddRoomForm from './admin/roomcreate'
import Allrooms from './admin/allrooms'
import Allusers from './admin/allusers'
import Allmessages from './admin/allmessages'
import Pagenotfound from './pages/pagenotfound'
import Blockusers from './admin/blockusers'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
function App() {

  return (
    <>
      <div className="text-8xl text-orange-500">

        <BrowserRouter>
          <Routes>
            <Route path='/register' element={<Registeration />} />
            <Route path='/' element={<Login />} />
            <Route path='/forgetpassword' element={<Forgetpassword />} />
            <Route path='/resetpassword/:token' element={<ResetPassword />} />
            {/* chatroom routes */}
              <Route path='/chatroomlist' element={<Chatroomprotect Component={Chatroomlist} />} />
              <Route path='/saifchat/:chatroomid/:userid' element = {<Chatroom />}/>
            {/* admin routes */}
            <Route path='/admindashboard' element = {<Adminapiprotect Component = {Admindashboard} />} />
            <Route path='/createchatroom' element = {<Adminapiprotect Component = {AddRoomForm} />} />
            <Route path='/allchatrooms' element = {<Adminapiprotect Component = {Allrooms} />} />
            <Route path='/allusers' element = {<Adminapiprotect Component = {Allusers} />} />
            <Route path='/allmessages' element = {<Adminapiprotect Component = {Allmessages} />} />
            <Route path='/blockusers' element = {<Adminapiprotect Component = {Blockusers} />} />
            {/* not found */}
            <Route path='/*' element = {<Pagenotfound />} />

          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App