const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");
const { authenticate, authorizeAdmin, authorizeCustomer } = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

// Admin routes - add, update, delete product
router.post("/", authenticate, authorizeAdmin, upload.single("image"), productController.addProduct);
router.put("/:id", authenticate, authorizeAdmin, productController.updateProduct);
router.delete("/:id", authenticate, authorizeAdmin, productController.deleteProduct);

// Public route to get all products (optionally can restrict to customers)
router.get("/", productController.getAllProducts);

// Public route or customer-only route for single product detail
router.get("/:id", productController.getProductById);

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







module.exports = router;
