const { body, param, query } = require("express-validator");

const addProductValidator = [
  body("name")
    .exists().withMessage("Product name is required")
    .isString().withMessage("Product name must be a string")
    .notEmpty().withMessage("Product name cannot be empty"),
  
  body("description")
    .optional()
    .isString().withMessage("Description must be a string"),

  body("price")
    .exists().withMessage("Price is required")
    .isFloat({ gt: 0 }).withMessage("Price must be a positive number"),

  body("stock")
    .exists().withMessage("Stock is required")
    .isInt({ min: 0 }).withMessage("Stock must be a non-negative integer"),

  body("categoryId")
    .exists().withMessage("Category ID is required")
    .isInt({ gt: 0 }).withMessage("Category ID must be a positive integer"),
  
];

const updateProductValidator = [
  param("id")
    .exists().withMessage("Product ID is required")
    .isInt({ gt: 0 }).withMessage("Product ID must be a positive integer"),
  
  body("name")
    .optional()
    .isString().withMessage("Product name must be a string")
    .notEmpty().withMessage("Product name cannot be empty"),

  body("description")
    .optional()
    .isString().withMessage("Description must be a string"),

  body("price")
    .optional()
    .isFloat({ gt: 0 }).withMessage("Price must be a positive number"),

  body("stock")
    .optional()
    .isInt({ min: 0 }).withMessage("Stock must be a non-negative integer"),

  body("categoryId")
    .optional()
    .isInt({ gt: 0 }).withMessage("Category ID must be a positive integer"),
];

const deleteProductValidator = [
  param("id")
    .exists().withMessage("Product ID is required")
    .isInt({ gt: 0 }).withMessage("Product ID must be a positive integer"),
];

const searchByNameValidator = [
  query("name")
    .exists().withMessage("Name query parameter is required")
    .isString().withMessage("Name must be a string"),
];

const searchByCategoryValidator = [
  query("categoryId")
    .exists().withMessage("Category ID query parameter is required")
    .isInt({ gt: 0 }).withMessage("Category ID must be a positive integer"),
];

const searchByPriceRangeValidator = [
  query("minPrice")
    .optional()
    .isFloat({ gt: 0 }).withMessage("minPrice must be a positive number"),
  query("maxPrice")
    .optional()
    .isFloat({ gt: 0 }).withMessage("maxPrice must be a positive number"),
];

const paginationValidator = [
  query("page")
    .optional()
    .isInt({ gt: 0 }).withMessage("Page must be a positive integer"),
  query("limit")
    .optional()
    .isInt({ gt: 0 }).withMessage("Limit must be a positive integer"),
];

module.exports = {
  addProductValidator,
  updateProductValidator,
  deleteProductValidator,
  searchByNameValidator,
  searchByCategoryValidator,
  searchByPriceRangeValidator,
  paginationValidator,
};
