const userService = require("../services/users.service");
const ApiError = require("../errorHandler/apiError");
const HttpStatus = require("../errorHandler/error.constants");

const register = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return next(new ApiError(HttpStatus.BAD_REQUEST, "Email, password, and role are required"));
    }

    const result = await userService.registerUser(email, password, role);

    res.status(HttpStatus.CREATED).json({
      success: true,
      ...result
    });
  } catch (error) {
    next(error instanceof ApiError ? error : new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, error.message, [], error.stack));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ApiError(HttpStatus.BAD_REQUEST, "Email and password are required"));
    }

    const result = await userService.loginUser(email, password);

    res.status(HttpStatus.OK).json({
      success: true,
      ...result
    });
  } catch (error) {
    next(error instanceof ApiError ? error : new ApiError(HttpStatus.UNAUTHORIZED, error.message, [], error.stack));
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.status(HttpStatus.OK).json({ success: true, data: users });
  } catch (err) {
    next(new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, err.message));
  }
};

module.exports = {
  register,
  login,
  getAllUsers
};
