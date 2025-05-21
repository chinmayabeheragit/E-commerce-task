const db = require("../models");
const User = db.User;

const findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

const createUser = async (userData) => {
  return await User.create(userData);
};

module.exports = {
  findUserByEmail,
  createUser,
  // Add other user-related queries here
}