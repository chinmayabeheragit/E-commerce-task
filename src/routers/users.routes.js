const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");

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
router.post("/register", userController.register);

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
router.post("/login", userController.login);

module.exports = router;
