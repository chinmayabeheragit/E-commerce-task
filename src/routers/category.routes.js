const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");
const { authenticate, authorizeAdmin } = require("../middleware/auth.middleware");
const validateRequest = require("../middleware/validateRequest.middleware");


const {
  addCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../validator/category.validator");

router.post(
  "/",
  authenticate,
  authorizeAdmin,
  addCategoryValidator,
  validateRequest,
  categoryController.addCategory
);

router.put(
  "/:id",
  authenticate,
  authorizeAdmin,
  updateCategoryValidator,
  validateRequest,
  categoryController.updateCategory
);

router.delete(
  "/:id",
  authenticate,
  authorizeAdmin,
  deleteCategoryValidator,
  validateRequest,
  categoryController.deleteCategory
);

router.get(
  "/",
  authenticate,
  authorizeAdmin,
  categoryController.listCategories
);


// swagger/category.swagger.js
/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category management by admin
 *
 * /api/categories:
 *   post:
 *     tags: [Category]
 *     summary: Create a new category
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Electronics
 *               description:
 *                 type: string
 *                 example: Devices and accessories
 *     responses:
 *       201:
 *         description: Category created
 *
 *   get:
 *     tags: [Category]
 *     summary: List all categories
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of categories
 *
 * /api/categories/{id}:
 *   put:
 *     tags: [Category]
 *     summary: Update a category by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated
 *
 *   delete:
 *     tags: [Category]
 *     summary: Delete a category by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Category deleted
 */



module.exports = router;