const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const User = require('./user.model');
const Messages = require('./message.model');
const { toJSON, paginate } = require('./plugins');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const roomSchema = Schema(
  {
    members: [
      {
        type: ObjectId,
        ref: User,
      },
    ],
    groupName: {
      type: String,
    },
    createdBy: {
      type: ObjectId,
      ref: User,
    },
    roomType: {
      type: String,
      require: true,
    },
    community: {
      type: ObjectId,
      ref: 'Community',
    },
    admins: [
      {
        type: ObjectId,
        ref: User,
        required: true,
      },
    ],
    pinned: [
      {
        type: ObjectId,
        ref: User,
      },
    ],
    photos: [
      {
        type: String,
      },
    ],
    isMuted: [
      {
        type: ObjectId,
        ref: User,
      },
    ],
    lastMessage: {
      type: ObjectId,
      ref: Messages,
    },
  },
  {
    timestamps: true,
  }
);

roomSchema.plugin(toJSON);
roomSchema.plugin(paginate);
roomSchema.plugin(mongoosePaginate);
/**
 * @typedef room
 */
const Room = mongoose.model('Rooms', roomSchema);

module.exports = Room;
