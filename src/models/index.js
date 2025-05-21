const fs = require("fs");
const path = require("path");
const { Sequelize } = require("sequelize");
const dbConfig = require("../../config/db");

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
  logging: false,
});

const db = {};

fs.readdirSync(__dirname)
  .filter(file => file !== "index.js" && file.endsWith(".model.js"))
  .forEach(file => {
    const modelDefiner = require(path.join(__dirname, file));
const model = modelDefiner(sequelize, Sequelize.DataTypes);
db[model.name] = model;

  });

Object.keys(db).forEach(modelName => {
  if (typeof db[modelName].associate === "function") {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
