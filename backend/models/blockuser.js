import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    roomname: { type:String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    createdAt: { type: Date, default: Date.now },
   
});



const blockuser = mongoose.model('blockuser', MessageSchema);

export default blockuser