import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const con = mongoose.connect(process.env.DB)
    .then(() => {

        console.log('connected')
    })
    .catch(console.error())


export default con