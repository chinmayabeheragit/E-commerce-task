const db = require("../models");
const User = db.User;

const findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

const createUser = async (userData) => {
  return await User.create(userData);
};

const findAllUsers = async () => {
  return await User.findAll({
    attributes: { exclude: ["password"] },
  });
};


module.exports = {
  findUserByEmail,
  createUser,
  findAllUsers
}