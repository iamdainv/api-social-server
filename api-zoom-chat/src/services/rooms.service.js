const { Rooms } = require('../models');

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryRoomsOfUserJoined = async (filter, options) => {
  const rooms = await Rooms.paginate(filter, options);
  return rooms;
};
/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<Rooms>}
 */
const getRoomById = async (id) => {
  return Rooms.findById(id);
};

/**
 * Create a user
 * @param {Object} roomBody
 * @returns {Promise<User>}
 */
const createRoom = async (room) => {
  const newRoom = await Rooms.create(room);
  return newRoom;
};

module.exports = {
  getRoomById,
  queryRoomsOfUserJoined,
  createRoom,
};
