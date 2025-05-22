const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET || "your_jwt_secret"; 

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};

const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }
  next();
};

const authorizeCustomer = (req, res, next) => {
  if (req.user.role !== "customer") {
    return res.status(403).json({ message: "Forbidden: Customers only" });
  }
  next();
};

module.exports = {
  authenticate,
  authorizeAdmin,
  authorizeCustomer,
};
