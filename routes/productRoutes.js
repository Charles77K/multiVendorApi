const productController = require('./../controllers/productController');
const express = require('express');
const authController = require('./../controllers/authController');

const productRouter = express.Router({
  mergeParams: true,
});

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management routes
 */

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of all available products with optional filtering and pagination
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of products per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort by field (e.g., price, name, -createdAt)
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *     responses:
 *       200:
 *         description: Successfully fetched all products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 results:
 *                   type: integer
 *                   example: 5
 *                 data:
 *                   type: object
 *                   properties:
 *                     products:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 *   post:
 *     summary: Create a new product
 *     description: Add a new product to the system (requires authentication)
 *     tags: [Products]
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
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 example: Pepperoni Pizza
 *               description:
 *                 type: string
 *                 example: Pizza with pepperoni and cheese
 *               price:
 *                 type: number
 *                 example: 14.99
 *               category:
 *                 type: string
 *                 example: Pizza
 *               image:
 *                 type: string
 *                 example: pepperoni.jpg
 *               available:
 *                 type: boolean
 *                 example: true
 *               restaurantId:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439012
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     product:
 *                       $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request - Invalid input
 *       401:
 *         description: Unauthorized
 */
productRouter
  .route('/')
  .get(productController.getAllProducts)
  .post(productController.setRestaurantId, productController.createProduct);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     description: Retrieve detailed information about a specific product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *         example: 507f1f77bcf86cd799439011
 *     responses:
 *       200:
 *         description: Product found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     product:
 *                       $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       400:
 *         description: Invalid ID format
 *   patch:
 *     summary: Update a product
 *     description: Update product details (requires authentication)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *         example: 507f1f77bcf86cd799439011
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Pizza Name
 *               description:
 *                 type: string
 *                 example: Updated description
 *               price:
 *                 type: number
 *                 example: 15.99
 *               category:
 *                 type: string
 *                 example: Italian
 *               available:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     product:
 *                       $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 *   delete:
 *     summary: Delete a product
 *     description: Remove a product from the system (requires authentication)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *         example: 507f1f77bcf86cd799439011
 *     responses:
 *       204:
 *         description: Product deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
productRouter
  .route('/:id')
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = productRouter;
