const categoryService = require("../services/category.service");
const ApiError = require("../errorHandler/apiError");
const HttpStatus = require("../errorHandler/error.constants");

const addCategory = async (req, res, next) => {
  try {
    const category = await categoryService.addCategory(req.body);
    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: "Category added successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const category = await categoryService.updateCategory(req.params.id, req.body);
    return res.status(HttpStatus.OK).json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    await categoryService.deleteCategory(req.params.id);
    return res.status(HttpStatus.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};

const listCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.listCategories();
    return res.status(HttpStatus.OK).json({
      success: true,
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addCategory,
  updateCategory,
  deleteCategory,
  listCategories,
};
