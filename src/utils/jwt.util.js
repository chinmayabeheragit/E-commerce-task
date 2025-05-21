const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET || "your_jwt_secret"; // Store securely

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    SECRET_KEY,
    { expiresIn: "7d" }
  );
};

module.exports = {
  generateToken,
};
