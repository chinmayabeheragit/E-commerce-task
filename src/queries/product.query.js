const {Product, Category} = require("../models");
const { Op } = require("sequelize");


const createProduct = async (productData) => {
  return await Product.create(productData);
};

const findProductById = async (productId) => {
  return await Product.findByPk(productId, {
    include: [{ model: Category, as: "category" }],
  });
};


const updateProductById = async (productId, updateData) => {
  const [updatedRows] = await Product.update(updateData, {
    where: { id: productId },
  });

  if (updatedRows === 0) {
    throw new Error("Product not found or no changes made");
  }

  const updatedProduct = await Product.findByPk(productId);
  return updatedProduct;
};

const deleteProductById = async (productId) => {
  const deletedRows = await Product.destroy({
    where: { id: productId },
  });

  if (deletedRows === 0) {
    throw new Error("Product not found");
  }

  return { message: "Product deleted successfully" };
};

const findAllProducts = async () => {
  return await Product.findAll({
    include: [{ model: Category, as: 'category' }],
  });
};

const findProductsByName = async (name) => {
  return await Product.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`  // case-insensitive partial match
      }
    },
    include: [{
      model: Category,
      as: "category"
    }]
  });
};

const findProductsByCategoryName = async (categoryName) => {
  return await Product.findAll({
    include: [
      {
        model: Category,
        as: "category",
        where: {
          name: {
            [Op.iLike]: `%${categoryName}%`  
          }
        }
      }
    ]
  });
};

const findProductsByPriceRange = async (min, max) => {
  return await Product.findAll({
    where: {
      price: {
        [Op.gte]: min,
        [Op.lte]: max
      }
    },
    include: [{
      model: Category,
      as: "category"
    }]
  });
};

const findProductsByPagination = async (page, limit) => {
  const offset = (page - 1) * limit;

  const { count, rows } = await Product.findAndCountAll({
    offset,
    limit,
    include: [{
      model: Category,
      as: "category"
    }]
  });

  return {
    totalItems: count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    products: rows
  };
};


module.exports = {
  createProduct,
  findProductById,
  updateProductById,
  deleteProductById,
  findAllProducts,
  findProductsByName,
  findProductsByCategoryName,
  findProductsByPriceRange,
  findProductsByPagination
};
