module.exports = (sequelize, DataTypes) => {
  const CartOrder = sequelize.define("CartOrder", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("cart", "placed", "cancelled", "delivered", "returned","ordered","shipped"),
      allowNull: false,
      defaultValue: "cart",
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
  });

  CartOrder.associate = (models) => {
    CartOrder.hasMany(models.CartOrderItem, {
      foreignKey: "cartOrderId",
      as: "items",
      onDelete: "CASCADE",
    });

    CartOrder.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  };

  return CartOrder;
};
