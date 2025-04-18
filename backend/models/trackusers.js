import mongoose from "mongoose";

const trackuserSchema = new mongoose.Schema({
    
    user: { type: mongoose.Schema.Types.ObjectId, required: true },
    room: { type: mongoose.Schema.Types.ObjectId, required: true },
    createdAt: { type: Date, default: Date.now }, // Immutable field
   
});

// Middleware to update the updatedAt field before each save

const trackuser = mongoose.model('trackuser', trackuserSchema);

export default trackuser