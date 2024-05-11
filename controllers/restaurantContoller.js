const factory = require('./handlerFactory');
const Restaurant = require('./../models/RestaurantModel');

exports.getAllRestaurants = factory.getAll(Restaurant);

exports.createRestaurnt = factory.createOne(Restaurant);

exports.getRestaurant = factory.getOne(Restaurant, {
  path: 'reviews',
});

exports.deleteRestaraunt = factory.deleteOne(Restaurant);

exports.updateRestaurant = factory.updateOne(Restaurant);
