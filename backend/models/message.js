import mongoose from "mongoose";
import moment from "moment";
const MessageSchema = new mongoose.Schema({
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'chatroom', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

MessageSchema.virtual('formattedTimestamp').get(function () {

    return moment(this.timestamp).fromNow();

});


const Message = mongoose.model('message', MessageSchema);

export default Message