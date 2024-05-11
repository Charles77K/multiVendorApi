const Product = require('./../models/productModel');
const Factory = require('./handlerFactory');

exports.setRestaurantId = (req, res, next) => {
  if (!req.body.restaurant) req.body.restaurant = req.params.restaurantId;
  next();
};

exports.getAllProducts = Factory.getAll(Product);

exports.getProduct = Factory.getOne(Product);

exports.createProduct = Factory.createOne(Product);

exports.deleteProduct = Factory.deleteOne(Product);

exports.updateProduct = Factory.updateOne(Product);
