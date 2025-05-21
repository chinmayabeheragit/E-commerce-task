const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./config/swagger");
const { sequelize } = require("./src/models"); // ✅ Sequelize instance

const userRoutes = require("./src/routers/users.routes");
const productRoutes = require("./src/routers/product.routes");
const categoryRoutes = require("./src/routers/category.routes");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Root Health Check
app.get("/", (req, res) => {
  res.send("E-Commerce API is alive ⚙️🚀");
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  try {
    await sequelize.authenticate();
    console.log("🔗 Database connected successfully.");
    
    // Synchronize models with DB schema
    await sequelize.sync({ alter: true }); // 'alter: true' adjusts tables without dropping data
    console.log("📐 Database schema synchronized.");
    
  } catch (error) {
    console.error("❌ Unable to connect or sync with the database:", error);
    process.exit(1); // Exit if critical DB connection fails
  }
});

