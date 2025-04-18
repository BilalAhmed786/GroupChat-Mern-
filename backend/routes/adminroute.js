import express from 'express';

import { roomcreate,getroomcreate,roomusers,roomedit,deleteroom,multiitemdel,allusers,
edituser,deleteuser,multideleteuser,allmessages,deletemessage,multidelmessage,blockuser,getblockuser,
deleteblockuser,multipleblockuserdel


 } from '../controller/admincontroller.js';



const adminrouter = express.Router();

adminrouter.post('/createroom',roomcreate);
adminrouter.post('/editroom',roomedit);
adminrouter.post('/multipleitemdel',multiitemdel);
adminrouter.get('/deleteroom/:id',deleteroom);
adminrouter.get('/createroom',getroomcreate);
adminrouter.get('/roomuser',roomusers)
adminrouter.get('/register',allusers);
adminrouter.post('/edituser',edituser)
adminrouter.delete('/deleteuser/:id',deleteuser)
adminrouter.post('/multipleusersdel',multideleteuser)
adminrouter.get('/allmessages',allmessages)
adminrouter.delete('/deletemessage/:id',deletemessage)
adminrouter.post('/multiplemessagesdel',multidelmessage)
adminrouter.post('/blockuser',blockuser)
adminrouter.get('/blockuser',getblockuser)
adminrouter.delete('/deleteblockuser',deleteblockuser)
adminrouter.post('/multipleblockusersdel',multipleblockuserdel)



export default adminrouter;