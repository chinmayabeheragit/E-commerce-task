module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    status: DataTypes.STRING,
    totalAmount: DataTypes.FLOAT,
  });

  Order.associate = (models) => {
    Order.belongsTo(models.User, { foreignKey: "userId" });
  };

  return Order;
};
