module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define("Cart", {
    product: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
  });

  Cart.associate = (models) => {
    Cart.belongsTo(models.User, { foreignKey: "userId" });
  };

  return Cart;
};
