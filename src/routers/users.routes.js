const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");
const { authenticate, authorizeAdmin } = require("../middleware/auth.middleware");
const { registerValidation, loginValidation } = require("../validator/user.validator");
const validateRequest = require("../middleware/validateRequest.middleware");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User Authentication
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register admin or customer
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - role
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, customer]
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post("/register", registerValidation, validateRequest, userController.register);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login as admin or customer
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", loginValidation, validateRequest, userController.login);

router.get("/all", authenticate, authorizeAdmin, userController.getAllUsers);
/**
 * @swagger
 * /api/users/all:
 *   get:
 *     summary: Get all registered users (admin only)
 *     description: Returns a list of all users. Access restricted to admin users only.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
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
 *                         type: string
 *                         example: "123e4567-e89b-12d3-a456-426614174000"
 *                       email:
 *                         type: string
 *                         example: "user@example.com"
 *                       role:
 *                         type: string
 *                         example: "customer"
 *       401:
 *         description: Unauthorized - No token provided
 *       403:
 *         description: Forbidden - Admins only
 */



module.exports = router;
