const Review = require('./../models/reviewModel'); // Tour model
// const catchAsync = require('../utils/catchAsync'); // utility for catching asyc errors
// const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

exports.setRestaurantUserIds = (req, res, next) => {
  //Allow nested routes
  if (!req.body.restaurant) req.body.restaurant = req.params.restaurantId;
  if (!req.body.User) req.body.User = req.user.id;
  next();
};
exports.getAllReviews = factory.getAll(Review);

exports.createReview = factory.createOne(Review);

exports.getReview = factory.getOne(Review);

exports.deleteReview = factory.deleteOne(Review);

exports.updateReview = factory.updateOne(Review);
