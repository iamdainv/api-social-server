const HttpService = require('./http.service');

const instance = new HttpService().instance();
/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return instance.get(`http://localhost:3001/v1/users/${id}`);
};

module.exports = {
  getUserById,
};
