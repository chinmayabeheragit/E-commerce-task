const express = require("express");
const router = express.Router();
const CartOrderController = require("../controllers/cart.order.controller");
const { authenticate, authorizeCustomer } = require("../middleware/auth.middleware");
const { addToCartValidator, removeFromCartValidator } = require("../validator/cart.order.validator");
const validateRequest = require("../middleware/validateRequest.middleware");

router.post(
  "/cart",
  authenticate,
  authorizeCustomer,
  addToCartValidator,
  validateRequest,
  CartOrderController.addToCart
);

router.get("/cart", authenticate, authorizeCustomer, CartOrderController.getCart);

router.delete(
  "/cart/:itemId",
  authenticate,
  authorizeCustomer,
  removeFromCartValidator,
  validateRequest,
  CartOrderController.removeFromCart
);

router.post("/order", authenticate, authorizeCustomer, CartOrderController.placeOrder);
router.get("/orders", authenticate, authorizeCustomer, CartOrderController.getOrderHistory);


/**
 * @swagger
 * /api/cartOrders/cart:
 *   post:
 *     summary: Add product to cart
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       "200":
 *         description: Item added successfully
 *
 *   get:
 *     summary: Get user's cart
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Cart
 *     responses:
 *       "200":
 *         description: List of items in user's cart
 *
 * /api/cartOrders/cart/{itemId}:
 *   delete:
 *     summary: Remove item from cart
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Cart
 *     parameters:
 *       - name: itemId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       "200":
 *         description: Item removed successfully
 *
 * /api/cartOrders/order:
 *   post:
 *     summary: Place an order from cart
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Order
 *     responses:
 *       "200":
 *         description: Order placed successfully
 *
 * /api/cartOrders/orders:
 *   get:
 *     summary: Get order history
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Order
 *     responses:
 *       "200":
 *         description: List of past orders
 */


module.exports = router;
