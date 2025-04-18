import mongoose from "mongoose";

const ChatRoomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description:{type:String,required:false},
    createdAt: { type: Date, default: Date.now },
    
});

const ChatRoom = mongoose.model('chatroom', ChatRoomSchema);

export default ChatRoom
