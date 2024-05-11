const express = require('express');
const restaurantController = require('./../controllers/restaurantContoller');
const reviewRouter = require('./reviewRoutes');
const productRouter = require('./productRoutes');

const restaurantRouter = express.Router();

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
