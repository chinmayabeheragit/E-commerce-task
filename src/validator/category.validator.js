const { body, param } = require("express-validator");

const addCategoryValidator = [
  body("name")
    .exists().withMessage("Category name is required")
    .isString().withMessage("Category name must be a string")
    .notEmpty().withMessage("Category name cannot be empty"),

  body("description")
    .optional()
    .isString().withMessage("Description must be a string"),
];

const updateCategoryValidator = [
  param("id")
    .exists().withMessage("Category ID is required")
    .isInt({ gt: 0 }).withMessage("Category ID must be a positive integer"),

  body("name")
    .optional()
    .isString().withMessage("Category name must be a string")
    .notEmpty().withMessage("Category name cannot be empty"),

  body("description")
    .optional()
    .isString().withMessage("Description must be a string"),
];

const deleteCategoryValidator = [
  param("id")
    .exists().withMessage("Category ID is required")
    .isInt({ gt: 0 }).withMessage("Category ID must be a positive integer"),
];

module.exports = {
  addCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
};
