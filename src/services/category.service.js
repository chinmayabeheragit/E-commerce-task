const categoryQuery = require("../queries/category.query");
const ApiError = require("../errorHandler/apiError");
const HttpStatus = require("../errorHandler/error.constants");

const addCategory = async (data) => {
  if (!data.name) {
    throw new ApiError(HttpStatus.BAD_REQUEST, "Category name is required");
  }
  return await categoryQuery.createCategory(data);
};

const updateCategory = async (id, data) => {
  const category = await categoryQuery.findCategoryById(id);
  if (!category) {
    throw new ApiError(HttpStatus.NOT_FOUND, "Category not found");
  }
  return await categoryQuery.updateCategory(id, data);
};

const deleteCategory = async (id) => {
  const category = await categoryQuery.findCategoryById(id);
  if (!category) {
    throw new ApiError(HttpStatus.NOT_FOUND, "Category not found");
  }
  await categoryQuery.deleteCategory(id);
};

const listCategories = async () => {
  return await categoryQuery.getAllCategories();
};

module.exports = {
  addCategory,
  updateCategory,
  deleteCategory,
  listCategories,
};
