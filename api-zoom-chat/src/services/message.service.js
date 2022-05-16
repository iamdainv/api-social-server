const Messages = require('../models/message.model')

const getMessageOfRoom = async (chatId, limit, page) => {
    limit = limit && parseInt(limit, 10) > 0 ? parseInt(limit, 10) : 10;
    page = page && parseInt(page, 10) > 0 ? parseInt(page, 10) : 1;
    const skip = (page - 1) * limit;
    const messages = await Messages.find({
        chatId,
    })
    .populate('lastMessage')
    .skip(skip)
    .limit(limit);

    return Promise.resolve(messages);
  }

  module.exports = {
    getMessageOfRoom
  };