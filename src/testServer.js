const app = require("../app");
const { sequelize } = require("./models");

const startTestServer = async () => {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });  
  return app.listen(0); 
};

module.exports = startTestServer;
