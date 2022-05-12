const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
// const { roomsService } = require('../services');
const { Messages } = require('../models');
const { Rooms } = require('../models');

const getMessageOfRoom = catchAsync(async (req, res) => {
  // eslint-disable-next-line prefer-const
  let { limit = 20, page = 1 } = req.query;
  const { chatId } = req.params;
  const filter = {
    chatId,
  };

  const options = {
    sortBy: '-createdAt',
    limit,
    page,
  };
  limit = options.limit && parseInt(options.limit, 10) > 0 ? parseInt(options.limit, 10) : 10;
  page = options.page && parseInt(options.page, 10) > 0 ? parseInt(options.page, 10) : 1;
  const skip = (page - 1) * limit;
  const countPromise = await Messages.countDocuments(filter).exec();

  const rooms = await Messages.find(filter).sort(options.sortBy).skip(skip).limit(limit);
  const totalPages = Math.ceil(countPromise / limit);

  const result = {
    results: rooms,
    page,
    limit,
    totalPages,
    totalResults: countPromise,
    code: 200,
  };
  return res.status(httpStatus.CREATED).send(result);
});

const createNeMessage = catchAsync(async (req, res) => {
  const body = {
    message: 'xin chao',
    messageType: 'text',
    createdBy: '622f5cdee8c15b7854babba6',
    chatId: '6234e7d20fcadb636ce6a8c3',
  };

  const newMessage = await Messages.create(body);
  // eslint-disable-next-line no-unused-vars
  const updateLassMessageChat = await Rooms.findOneAndUpdate(
    { _id: '6234e7d20fcadb636ce6a8c3' },
    { lastMessage: newMessage._id }
  );

  res.status(httpStatus.CREATED).send({ result: newMessage });
});

module.exports = {
  getMessageOfRoom,
  createNeMessage,
};
