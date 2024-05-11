const productController = require('./../controllers/productController');
const express = require('express');
const authController = require('./../controllers/authController');

const productRouter = express.Router({
  mergeParams: true,
});

productRouter.use(authController.protect);

productRouter
  .route('/')
  .get(productController.getAllProducts)
  .post(productController.setRestaurantId, productController.createProduct);

productRouter
  .route('/:id')
  .get(productController.getProduct)
  .delete(productController.deleteProduct)
  .patch(productController.updateProduct);

module.exports = productRouter;
