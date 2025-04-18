import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true

    },
    password: {

        type: String,
        required: true
    },
    retypepassword: {
        type: String,
        required: true

    },
    role: {
        type: String,
        default:"chatuser"

    },

    status:{
        type:String,
        default:"offline"

    }

})


const User = mongoose.model('user', userSchema)

export default User

