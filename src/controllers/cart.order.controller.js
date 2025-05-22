const orderCartService = require("../services/cart.order.service");
const ApiError = require("../errorHandler/apiError");
const HttpStatus = require("../errorHandler/error.constants");

const addToCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;
    const result = await orderCartService.addToCart(userId, productId, quantity);
    res.status(HttpStatus.OK).json(result);
  } catch (error) {
    next(error instanceof ApiError ? error : new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, error.message, [], error.stack));
  }
};

const getCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cart = await orderCartService.getCart(userId);
    res.status(HttpStatus.OK).json(cart);
  } catch (error) {
    next(error instanceof ApiError ? error : new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, error.message, [], error.stack));
  }
};

const removeFromCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const itemId = req.params.itemId;
    await orderCartService.removeFromCart(userId, itemId);
    res.status(HttpStatus.OK).json({ message: "Item removed from cart" });
  } catch (error) {
    next(error instanceof ApiError ? error : new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, error.message, [], error.stack));
  }
};

const placeOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await orderCartService.placeOrder(userId);
    res.status(HttpStatus.OK).json({ message: "Order placed successfully", order: result });
  } catch (error) {
    next(error instanceof ApiError ? error : new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, error.message, [], error.stack));
  }
};

const getOrderHistory = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const orders = await orderCartService.getOrderHistory(userId);
    res.status(HttpStatus.OK).json(orders);
  } catch (error) {
    next(error instanceof ApiError ? error : new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, error.message, [], error.stack));
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  placeOrder,
  getOrderHistory,
};
