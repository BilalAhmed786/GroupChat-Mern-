import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'chatroom', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    socketid: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
   
});



const roomuser = mongoose.model('roomuser', MessageSchema);

export default roomuser