const db = require("../models");
const Category = db.Category;

const createCategory = async (data) => await Category.create(data);
const findCategoryById = async (id) => await Category.findByPk(id);
const updateCategory = async (id, data) => {
  await Category.update(data, { where: { id } });
  return await findCategoryById(id);
};
const deleteCategory = async (id) => await Category.destroy({ where: { id } });
const getAllCategories = async () => await Category.findAll();

module.exports = {
  createCategory,
  findCategoryById,
  updateCategory,
  deleteCategory,
  getAllCategories,
};