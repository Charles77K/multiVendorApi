const express = require('express');
const restaurantController = require('./../controllers/restaurantContoller');
const reviewRouter = require('./reviewRoutes');
const productRouter = require('./productRoutes');

const restaurantRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Restaurants
 *   description: Restaurant management and related operations
 */

/**
 * @swagger
 * /api/v1/restaurant:
 *   get:
 *     summary: Get all restaurants
 *     tags: [Restaurants]
 *     responses:
 *       200:
 *         description: List of all restaurants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Restaurant'
 *   post:
 *     summary: Create a new restaurant
 *     tags: [Restaurants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Restaurant'
 *     responses:
 *       201:
 *         description: Restaurant successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant'
 */

/**
 * @swagger
 * /api/v1/restaurant/{id}:
 *   get:
 *     summary: Get a restaurant by ID
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the restaurant
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Restaurant details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant'
 *       404:
 *         description: Restaurant not found
 *
 *   patch:
 *     summary: Update restaurant by ID
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the restaurant to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Restaurant'
 *     responses:
 *       200:
 *         description: Restaurant updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant'
 *       404:
 *         description: Restaurant not found
 *
 *   delete:
 *     summary: Delete a restaurant by ID
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the restaurant to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Restaurant deleted successfully
 *       404:
 *         description: Restaurant not found
 */

/**
 * @swagger
 * /api/v1/restaurant/{restaurantId}/reviews:
 *   get:
 *     summary: Get all reviews for a specific restaurant
 *     tags: [Restaurants, Reviews]
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         description: ID of the restaurant
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of reviews for the restaurant
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *   post:
 *     summary: Create a review for a specific restaurant
 *     tags: [Restaurants, Reviews]
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         description: ID of the restaurant
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: Review successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 */

/**
 * @swagger
 * /api/v1/restaurant/{restaurantId}/products:
 *   get:
 *     summary: Get all products for a specific restaurant
 *     tags: [Restaurants, Products]
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         description: ID of the restaurant
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of products offered by the restaurant
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *   post:
 *     summary: Create a product for a specific restaurant
 *     tags: [Restaurants, Products]
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         description: ID of the restaurant
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */

restaurantRouter.use('/:restaurantId/reviews', reviewRouter);
restaurantRouter.use('/:restaurantId/products', productRouter);

restaurantRouter
  .route('/')
  .get(restaurantController.getAllRestaurants)
  .post(restaurantController.createRestaurnt);

restaurantRouter
  .route('/:id')
  .get(restaurantController.getRestaurant)
  .delete(restaurantController.deleteRestaraunt)
  .patch(restaurantController.updateRestaurant);

module.exports = restaurantRouter;
