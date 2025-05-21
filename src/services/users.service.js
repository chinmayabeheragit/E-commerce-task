const bcrypt = require("bcryptjs");
const jwt = require("../../src/utils/jwt.util");
const userQuery = require("../queries/user.query");
const ApiError = require("../errorHandler/apiError");
const HttpStatus = require("../errorHandler/error.constants");

exports.registerUser = async (email, password, role) => {
  const existingUser = await userQuery.findUserByEmail(email);
  if (existingUser) throw new ApiError(HttpStatus.CONFLICT, "Email already registered");

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await userQuery.createUser({ email, password: hashedPassword, role });

  return { message: "User registered successfully", user: newUser };
};

exports.loginUser = async (email, password) => {
  const user = await userQuery.findUserByEmail(email);
  if (!user) throw new ApiError(HttpStatus.UNAUTHORIZED, "Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new ApiError(HttpStatus.UNAUTHORIZED, "Invalid credentials");

  const token = jwt.generateToken({ id: user.id, email: user.email, role: user.role });
  return { message: "Login successful", token };
};
