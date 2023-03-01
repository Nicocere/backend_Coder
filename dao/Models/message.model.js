import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
      },
      message: {
        type: String,
        required: true
      },
      timestamp: {
        type: Date,
        default: Date.now
      }


});

export const MessageModel = mongoose.model('Messages', messageSchema);