const httpStatus = require('http-status');
const mongoose = require('mongoose');
const catchAsync = require('../utils/catchAsync');
// const { roomsService } = require('../services');
const { Rooms } = require('../models');

const getRoomsOfUser = catchAsync(async (req, res) => {
  const { id } = req.user.data;

  let { limit = 20, page = 1 } = req.query;

  const filter = {
    members: id,
  };

  const options = {
    sortBy: '-lastMessageAt',
    limit,
    page,
  };
  limit = options.limit && parseInt(options.limit, 10) > 0 ? parseInt(options.limit, 10) : 10;
  page = options.page && parseInt(options.page, 10) > 0 ? parseInt(options.page, 10) : 1;
  const skip = (page - 1) * limit;
  const countPromise = await Rooms.countDocuments(filter).exec();

  const rooms = await Rooms.find(filter)
    .populate('members', '-password -likePost')
    .populate({ path: 'lastMessage', options: { sort: { createdAt: -1 } } })
    .skip(skip)
    .limit(limit);
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

const createNewRoom = catchAsync(async (req, res) => {
  let { members, isMuted, createdBy } = req.body;

  members = members.map(mongoose.Types.ObjectId);
  isMuted = isMuted.map(mongoose.Types.ObjectId);
  createdBy = mongoose.Types.ObjectId(createdBy);

  const newRoom = await Rooms.create({ ...req.body, members, isMuted, createdBy });
  await newRoom.save();
  const findRomeById = await Rooms.findOne({ _id: newRoom._id }).populate('members', '-password -likePost');

  res.status(httpStatus.CREATED).send({ chat: findRomeById });
});

const getRoomById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const newRoom = await Rooms.find({ _id: id }).populate('members', '-password -likePost');
  return res.status(200).send({ newRoom, code: 200 });
});

module.exports = {
  getRoomsOfUser,
  createNewRoom,
  getRoomById,
};
