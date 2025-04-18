import express from 'express';
import { register,login,validate,authuser,logout,forgetpass,resetpass} from '../controller/authcontroller.js';



const router = express.Router();

router.post('/register',register);

router.post('/login',login);
router.get('/logout',logout);
router.post('/forgetpassword',forgetpass);
router.post('/resetpassword',resetpass);
router.get('/validate',validate)
router.get('/authorize',authuser)


export default router;