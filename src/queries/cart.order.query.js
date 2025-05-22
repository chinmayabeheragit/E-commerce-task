const { CartOrder, CartOrderItem, Product, sequelize } = require("../models");

const addToCart = async (userId, productId, quantity) => {
  const product = await Product.findByPk(productId);
  if (!product) throw new Error("Product not found");

  let cart = await CartOrder.findOne({ where: { userId, status: "cart" } });
  if (!cart) {
    cart = await CartOrder.create({ userId, status: "cart" });
  }

const item = await CartOrderItem.create({
  cartOrderId: cart.id,
  productId,
  quantity,
  priceAtAdd: product.price,
});


  return item;
};

const getCart = async (userId) => {
  const cart = await CartOrder.findOne({
    where: { userId, status: "cart" },
    include: {
      model: CartOrderItem,
      as: "items",
      include: { model: Product, as: "product" }
    },
  });

  if (!cart) return { items: [], totalAmount: 0 };

  let total = 0;
  cart.items.forEach(item => {
    total += item.priceAtTime * item.quantity;
  });

  return { items: cart.items, totalAmount: total };
};

const removeFromCart = async (userId, itemId) => {
  const cart = await CartOrder.findOne({ where: { userId, status: "cart" } });
  if (!cart) throw new Error("Cart not found");

  const item = await CartOrderItem.findOne({
    where: { id: itemId, cartOrderId: cart.id }
  });
  if (!item) throw new Error("Item not found in your cart");

  await item.destroy();
};

const placeOrder = async (userId) => {
  const cart = await CartOrder.findOne({
    where: { userId, status: "cart" },
    include: { model: CartOrderItem, as: "items" }
  });

  if (!cart || !cart.items.length) throw new Error("Your cart is empty");

  const totalAmount = cart.items.reduce((sum, item) => {
    return sum + item.priceAtTime * item.quantity;
  }, 0);

  await cart.update({ status: "ordered", totalAmount });

  return cart;
};

const getOrderHistory = async (userId) => {
  const orders = await CartOrder.findAll({
    where: { userId, status: "ordered" },
    include: {
      model: CartOrderItem,
      as: "items",
      include: { model: Product, as: "product" }
    },
    order: [["createdAt", "DESC"]],
  });

  return orders;
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  placeOrder,
  getOrderHistory,
};