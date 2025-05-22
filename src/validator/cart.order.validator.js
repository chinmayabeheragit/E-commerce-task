const { body, param } = require("express-validator");

const addToCartValidator = [
  body("productId")
    .exists().withMessage("Product ID is required")
    .isInt({ gt: 0 }).withMessage("Product ID must be a positive integer"),
  body("quantity")
    .optional()
    .isInt({ gt: 0 }).withMessage("Quantity must be a positive integer"),
];

const removeFromCartValidator = [
  param("itemId")
    .exists().withMessage("Cart item ID is required")
    .isInt({ gt: 0 }).withMessage("Cart item ID must be a positive integer"),
];

module.exports = {
  addToCartValidator,
  removeFromCartValidator,
};
