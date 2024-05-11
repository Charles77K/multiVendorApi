const express = require('express');
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');

const reviewRouter = express.Router({
  mergeParams: true,
});

reviewRouter.use(authController.protect);

reviewRouter
  .route('/')
  .get(authController.restrictTo('user'), reviewController.getAllReviews)
  .post(
    authController.restrictTo('user'),
    reviewController.setRestaurantUserIds,
    reviewController.createReview,
  );

reviewRouter
  .route('/:id')
  .get(authController.restrictTo('admin'), reviewController.getReview)
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewController.deleteReview,
  )
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.updateReview,
  );

module.exports = reviewRouter;
