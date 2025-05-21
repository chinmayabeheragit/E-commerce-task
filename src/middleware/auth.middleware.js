const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET || "your_jwt_secret"; // Store in .env

// Verify token and attach user to request
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // { id, email, role }
    next();
  } catch (err) {
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};

// Restrict access to admin only
const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }
  next();
};

// Restrict access to customer only
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
