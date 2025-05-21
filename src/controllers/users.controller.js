const userService = require("../services/users.service");

exports.register = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    const result = await userService.registerUser(email, password, role);
    res.status(201).json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await userService.loginUser(email, password);
    res.status(200).json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};
