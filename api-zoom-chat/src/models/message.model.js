
const { toJSON, paginate } = require('./plugins');
const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const messageSchema = Schema(
  {
    message: {
      type: String,
    },
    messageImage: [
      {
        type: String,
      },
    ],
    messageType: {
      type: String,
    },
    createdBy: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    chatId: {
      type: ObjectId,
      ref: 'Rooms',
      required: true,
    },
    replyBy: [
      {
        type: ObjectId,
        ref: 'Messages',
      },
    ],
    isDeleted: [
      {
        type: ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

messageSchema.plugin(toJSON);
messageSchema.plugin(paginate);
/**
 * @typedef message
 */
const Message = mongoose.model('Messages', messageSchema);

module.exports = Message;
