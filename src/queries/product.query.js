const {Product} = require("../models");

const createProduct = async (productData) => {
  return await Product.create(productData);
};

const findProductById = async (productId) => {
  return await Product.findById(productId);
};

const updateProductById = async (productId, updateData) => {
  return await Product.findByIdAndUpdate(productId, updateData, { new: true });
};

const deleteProductById = async (productId) => {
  return await Product.findByIdAndDelete(productId);
};

const findAllProducts = async () => {
  return await Product.find();
};

module.exports = {
  createProduct,
  findProductById,
  updateProductById,
  deleteProductById,
  findAllProducts,
};
