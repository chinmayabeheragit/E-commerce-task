
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-Commerce API",
      version: "1.0.0",
      description: "API documentation for the E-Commerce platform",
      contact: {
        name: "Chinmaya Behera",
        email: "your-email@example.com"
      },
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [
    "./src/routers/*.js",
    "./src/controllers/*.js",
    "./src/models/*.js",
  ],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
