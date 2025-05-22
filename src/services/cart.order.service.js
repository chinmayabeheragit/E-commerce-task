const orderCartQuery = require("../queries/cart.order.query");

const addToCart = async (userId, productId, quantity) => {
  return await orderCartQuery.addToCart(userId, productId, quantity);
};

const getCart = async (userId) => {
  return await orderCartQuery.getCart(userId);
};

const removeFromCart = async (userId, itemId) => {
  return await orderCartQuery.removeFromCart(userId, itemId);
};

const placeOrder = async (userId) => {
  return await orderCartQuery.placeOrder(userId);
};

const getOrderHistory = async (userId) => {
  return await orderCartQuery.getOrderHistory(userId);
};

module.exports = {
    addToCart,
    getCart,
    removeFromCart,
    placeOrder,
    getOrderHistory,
}