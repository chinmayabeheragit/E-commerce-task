const productService = require("../services/product.service");
const ApiError = require("../errorHandler/apiError");
const HttpStatus = require("../errorHandler/error.constants");

const addProduct = async (req, res, next) => {
  try {
    const productData = req.body;

    if (req.file && req.file.path) {
      productData.imageUrl = req.file.path;
    }

    const product = await productService.addProduct(productData);
    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: "Product added successfully",
      data: product,
    });
  } catch (error) {

    next(error instanceof ApiError 
      ? error 
      : new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error", [], error.stack));
  }
};



const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);
    return res.status(HttpStatus.OK).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedProduct = await productService.updateProduct(id, updateData);
    return res.status(HttpStatus.OK).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await productService.deleteProduct(id);
    return res.status(HttpStatus.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts();
    return res.status(HttpStatus.OK).json({
      success: true,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

const getProductByName = async (req, res, next) => {
  try {
    const { name } = req.query;
    if (!name) {
      return next(new ApiError(HttpStatus.BAD_REQUEST, "Query parameter 'name' is required"));
    }

    const products = await productService.getProductsByName(name);
    res.status(HttpStatus.OK).json({
      success: true,
      data: products
    });
  } catch (error) {
    next(error instanceof ApiError ? error : new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, error.message, [], error.stack));
  }
};

const getProductByCategory = async (req, res, next) => {
  try {
    const { name } = req.query;

    if (!name) {
      return next(new ApiError(HttpStatus.BAD_REQUEST, "Category name is required"));
    }

    const products = await productService.getProductsByCategory(name);
    res.status(HttpStatus.OK).json({
      success: true,
      data: products
    });
  } catch (error) {
    next(error instanceof ApiError ? error : new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, error.message, [], error.stack));
  }
};

const getProductByPriceRange = async (req, res, next) => {
  try {
    const { min, max } = req.query;

    if (!min || !max) {
      return next(new ApiError(HttpStatus.BAD_REQUEST, "Both min and max price are required"));
    }

    const minPrice = parseFloat(min);
    const maxPrice = parseFloat(max);

    if (isNaN(minPrice) || isNaN(maxPrice)) {
      return next(new ApiError(HttpStatus.BAD_REQUEST, "Min and max must be valid numbers"));
    }

    const products = await productService.getProductsByPriceRange(minPrice, maxPrice);
    res.status(HttpStatus.OK).json({
      success: true,
      data: products
    });
  } catch (error) {
    next(error instanceof ApiError ? error : new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, error.message, [], error.stack));
  }
};

const getProductsByPagination = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (page < 1 || limit < 1) {
      return next(new ApiError(HttpStatus.BAD_REQUEST, "Page and limit must be positive integers"));
    }

    const result = await productService.getProductsByPagination(page, limit);
    res.status(HttpStatus.OK).json({
      success: true,
      ...result
    });
  } catch (error) {
    next(error instanceof ApiError ? error : new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, error.message, [], error.stack));
  }
};

module.exports = {
  addProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductByName,
  getProductByCategory,
  getProductByPriceRange,
  getProductsByPagination
};
