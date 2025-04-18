import { fileroute } from '../controller/filecontroller.js'
import upload from '../multer/multer.js'
import {Router} from 'express'
const filerouter = Router()



filerouter.post('/',upload.single('file'),fileroute)

export default filerouter