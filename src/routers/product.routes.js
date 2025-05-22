const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const { authenticate, authorizeAdmin } = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");  
const validateRequest = require("../middleware/validateRequest.middleware");

const {
  addProductValidator,
  updateProductValidator,
  deleteProductValidator,
  searchByNameValidator,
  searchByCategoryValidator,
  searchByPriceRangeValidator,
  paginationValidator,
} = require("../validator/product.validator");

router.post(
  "/",
  authenticate,
  authorizeAdmin,
  upload.single("image"),
  addProductValidator,
  validateRequest,
  productController.addProduct
);

router.put(
  "/:id",
  authenticate,
  authorizeAdmin,
  updateProductValidator,
  validateRequest,
  productController.updateProduct
);

router.delete(
  "/:id",
  authenticate,
  authorizeAdmin,
  deleteProductValidator,
  validateRequest,
  productController.deleteProduct
);

router.get(
  "/",
  productController.getAllProducts
);

router.get(
  "/:id",
  productController.getProductById
);

router.get(
  "/search/name",
  searchByNameValidator,
  validateRequest,
  productController.getProductByName
);

router.get(
  "/search/category",
  searchByCategoryValidator,
  validateRequest,
  productController.getProductByCategory
);

router.get(
  "/search/price",
  searchByPriceRangeValidator,
  validateRequest,
  productController.getProductByPriceRange
);

router.get(
  "/paginate/products",
  paginationValidator,
  validateRequest,
  productController.getProductsByPagination
);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Add a new product (Admin only)
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Product information with image upload
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - stock
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Gaming Laptop"
 *               description:
 *                 type: string
 *                 example: "High-performance gaming laptop with RTX 4080"
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 2499.99
 *               stock:
 *                 type: integer
 *                 example: 10
 *               categoryId:
 *                 type: integer
 *                 example: 3
 *                 description: Foreign key reference to product category
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file to upload
 *     responses:
 *       201:
 *         description: Product added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Product added successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Gaming Laptop"
 *                     description:
 *                       type: string
 *                       example: "High-performance gaming laptop with RTX 4080"
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 2499.99
 *                     stock:
 *                       type: integer
 *                       example: 10
 *                     categoryId:
 *                       type: integer
 *                       example: 3
 *                     imageUrl:
 *                       type: string
 *                       example: "http://res.cloudinary.com/yourcloud/image/upload/v12345/image.jpg"
 *       400:
 *         description: Bad request (validation error)
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       403:
 *         description: Forbidden (admin only)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update an existing product (Admin only)
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Gaming Laptop"
 *               description:
 *                 type: string
 *                 example: "Updated description for the gaming laptop"
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 2299.99
 *               stock:
 *                 type: integer
 *                 example: 5
 *               categoryId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Product updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request (e.g., invalid input)
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       403:
 *         description: Forbidden (admin only)
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product by ID (Admin only)
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID to delete
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Product deleted successfully
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       403:
 *         description: Forbidden - only admin can delete
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Gaming Laptop"
 *                       description:
 *                         type: string
 *                         example: "High-performance gaming laptop"
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 2499.99
 *                       stock:
 *                         type: integer
 *                         example: 10
 *                       imageUrl:
 *                         type: string
 *                         example: "http://example.com/image.jpg"
 *                       category:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 3
 *                           name:
 *                             type: string
 *                             example: "Electronics"
 *                           description:
 *                             type: string
 *                             example: "Devices and gadgets"
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the product to retrieve
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Product details by ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Gaming Laptop"
 *                     description:
 *                       type: string
 *                       example: "High-performance gaming laptop"
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 2499.99
 *                     stock:
 *                       type: integer
 *                       example: 10
 *                     imageUrl:
 *                       type: string
 *                       example: "http://example.com/image.jpg"
 *                     category:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 3
 *                         name:
 *                           type: string
 *                           example: "Electronics"
 *                         description:
 *                           type: string
 *                           example: "Devices and gadgets"
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Product not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * /api/products/search/name:
 *   get:
 *     summary: Search products by name (partial, case-insensitive)
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Partial or full product name to search
 *     responses:
 *       200:
 *         description: List of products matching the search name
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Gaming Laptop"
 *                       description:
 *                         type: string
 *                         example: "High-performance gaming laptop with RTX 4080"
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 2499.99
 *                       stock:
 *                         type: integer
 *                         example: 10
 *                       imageUrl:
 *                         type: string
 *                         example: "http://example.com/image.jpg"
 *                       category:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 3
 *                           name:
 *                             type: string
 *                             example: "Electronics"
 *                           description:
 *                             type: string
 *                             example: "Devices and gadgets"
 *       400:
 *         description: Bad Request - missing query parameter 'name'
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Query parameter 'name' is required"
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/products/search/category:
 *   get:
 *     summary: Get products by category name
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The category name to search products by
 *     responses:
 *       200:
 *         description: Products matching the category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Smartphone"
 *                       description:
 *                         type: string
 *                         example: "Latest 5G smartphone"
 *                       price:
 *                         type: number
 *                         example: 999.99
 *                       stock:
 *                         type: integer
 *                         example: 50
 *                       imageUrl:
 *                         type: string
 *                         example: "http://example.com/phone.jpg"
 *                       category:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 2
 *                           name:
 *                             type: string
 *                             example: "Electronics"
 *                           description:
 *                             type: string
 *                             example: "Electronic gadgets and devices"
 *       400:
 *         description: Missing category name
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/products/search/price:
 *   get:
 *     summary: Get products by price range
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: min
 *         schema:
 *           type: number
 *         required: true
 *         description: Minimum price
 *       - in: query
 *         name: max
 *         schema:
 *           type: number
 *         required: true
 *         description: Maximum price
 *     responses:
 *       200:
 *         description: Products within the specified price range
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Mechanical Keyboard"
 *                       description:
 *                         type: string
 *                         example: "RGB backlit mechanical keyboard"
 *                       price:
 *                         type: number
 *                         example: 999.99
 *                       stock:
 *                         type: integer
 *                         example: 25
 *                       imageUrl:
 *                         type: string
 *                         example: "http://example.com/keyboard.jpg"
 *                       category:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 4
 *                           name:
 *                             type: string
 *                             example: "Accessories"
 *                           description:
 *                             type: string
 *                             example: "Computer peripherals and accessories"
 *       400:
 *         description: Missing or invalid query parameters
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/products/paginate/products:
 *   get:
 *     summary: Get paginated products
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         required: false
 *         description: Page number (default is 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         required: false
 *         description: Number of products per page (default is 10)
 *     responses:
 *       200:
 *         description: A list of paginated products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 totalItems:
 *                   type: integer
 *                   example: 50
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Laptop"
 *                       price:
 *                         type: number
 *                         example: 1299.99
 *                       description:
 *                         type: string
 *                         example: "High-end performance laptop"
 *                       stock:
 *                         type: integer
 *                         example: 12
 *                       imageUrl:
 *                         type: string
 *                         example: "http://example.com/laptop.jpg"
 *                       category:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 3
 *                           name:
 *                             type: string
 *                             example: "Electronics"
 *                           description:
 *                             type: string
 *                             example: "Electronic gadgets and devices"
 *       400:
 *         description: Invalid page or limit values
 *       500:
 *         description: Internal server error
 */


module.exports = router;
