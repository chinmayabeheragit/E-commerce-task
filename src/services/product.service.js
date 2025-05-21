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

module.exports = {
  addProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllProducts,
};
