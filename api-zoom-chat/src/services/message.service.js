
const mongoose = require('mongoose');
const { Rooms, Messages } = require('../models');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const getMessageOfRoom = async (chatId, limit, page) => {
    limit = limit && parseInt(limit, 10) > 0 ? parseInt(limit, 10) : 10;
    page = page && parseInt(page, 10) > 0 ? parseInt(page, 10) : 1;
    const skip = (page - 1) * limit;
    const messages = await Messages.find({
        chatId,
    })
    .populate('lastMessage')
    .sort({'createdAt': -1})
    .skip(skip)
    .limit(limit);

    return Promise.resolve(messages.reverse());
  }


  /**
 * Get user by id
 * @param {ObjectId} messageData
 * @returns {Promise<Rooms>}
 */
const createNewMessage =async (messageData) => {
  console.log(messageData.creator)
  try {
    const newMessage = new Messages({
      message: messageData.message,
      chatId: mongoose.Types.ObjectId(messageData.chatId),
      messageType: "text",
      isDeleted: [], 
      replyBy: [],
      createdBy: mongoose.Types.ObjectId(messageData.creator),
    });
  
    const result = await newMessage.save();

    const updateLassMessageChat = await Rooms.findOneAndUpdate(
      { _id: messageData.chatId },
      { lastMessage: result._id },
      {new: true}
    ).populate('members', '-password -likePost').populate('lastMessage');

    return {newMessage: result, roomUpdate: updateLassMessageChat};
  } catch (error) {
    console.log("🚀 ~ file: message.service.js ~ line 28 ~ createNewMessage ~ error", error);
  }

}

  module.exports = {
    getMessageOfRoom,
    createNewMessage,
  };