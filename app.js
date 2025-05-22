const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./config/swagger");
const { sequelize } = require("./src/models");

const userRoutes = require("./src/routers/users.routes");
const productRoutes = require("./src/routers/product.routes");
const categoryRoutes = require("./src/routers/category.routes");
const cartOrderRoutes = require("./src/routers/cart.order.routes");

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.send("E-Commerce API is alive ⚙️🚀");
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cartOrders", cartOrderRoutes);


module.exports = app;


if (require.main === module) {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, async () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    try {
      await sequelize.authenticate();
      console.log("🔗 Database connected successfully.");
      await sequelize.sync({ alter: true });
      console.log("📐 Database schema synchronized.");
    } catch (error) {
      console.error("❌ Unable to connect or sync with the database:", error);
      process.exit(1);
    }
  });
}
