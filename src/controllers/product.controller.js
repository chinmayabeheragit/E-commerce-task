const productService = require("../services/product.service");
const ApiError = require("../errorHandler/apiError");
const HttpStatus = require("../errorHandler/error.constants");

const addProduct = async (req, res, next) => {
  try {
    const productData = req.body;
    
    if (req.file && req.file.path) {
      productData.imageUrl = req.file.path; // Cloudinary file url
    }

    const product = await productService.addProduct(productData);
    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: product,
    });
  } catch (error) {
    console.error(error);
    next(error);
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

module.exports = {
  addProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllProducts,
};
