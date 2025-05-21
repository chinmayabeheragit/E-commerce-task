const ApiError = require("../errorHandler/apiError");
const HttpStatus = require("../errorHandler/error.constants");
const productQuery = require("../queries/product.query");

const addProduct = async (productData) => {
  const product = await productQuery.createProduct(productData);
  return product;
};

const getProductById = async (productId) => {
  const product = await productQuery.findProductById(productId);
  if (!product) {
    throw new ApiError(HttpStatus.NOT_FOUND, "Product not found");
  }
  return product;
};

const updateProduct = async (productId, updateData) => {
  const updatedProduct = await productQuery.updateProductById(productId, updateData);
  if (!updatedProduct) {
    throw new ApiError(HttpStatus.NOT_FOUND, "Product not found for update");
  }
  return updatedProduct;
};

const deleteProduct = async (productId) => {
  const deletedProduct = await productQuery.deleteProductById(productId);
  if (!deletedProduct) {
    throw new ApiError(HttpStatus.NOT_FOUND, "Product not found for deletion");
  }
  return deletedProduct;
};

const getAllProducts = async () => {
  return await productQuery.findAllProducts();
};

const getProductsByName = async (name) => {
  if (!name) {
    throw new Error("Product name query parameter is required");
  }
  const products = await productQuery.findProductsByName(name);
  return products;
};

const getProductsByCategory = async (categoryName) => {
  return await productQuery.findProductsByCategoryName(categoryName);
};

const getProductsByPriceRange = async (min, max) => {
  return await productQuery.findProductsByPriceRange(min, max);
};

const getProductsByPagination = async (page, limit) => {
  return await productQuery.findProductsByPagination(page, limit);
};
module.exports = {
  addProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductsByName,
  getProductsByCategory,
  getProductsByPriceRange,
  getProductsByPagination
};
