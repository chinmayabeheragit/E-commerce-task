module.exports = (sequelize, DataTypes) => {
  const CartOrderItem = sequelize.define("CartOrderItem", {
    cartOrderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    priceAtAdd: {
      type: DataTypes.FLOAT,
      allowNull: false,
      comment: "Price of the product when added to cart, for persistent pricing",
    },
  });

  CartOrderItem.associate = (models) => {
    CartOrderItem.belongsTo(models.CartOrder, {
      foreignKey: "cartOrderId",
      as: "cartOrder",
    });

    CartOrderItem.belongsTo(models.Product, {
      foreignKey: "productId",
      as: "product",
    });
  };

  return CartOrderItem;
};
