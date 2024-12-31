const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');

const userRouter = express.Router();

userRouter.route('/signup').post(authController.signup);
userRouter.route('/login').post(authController.login);
userRouter.route('/forgotPassword').post(authController.forgotPassword);
userRouter.route('/resetPassword/:token').patch(authController.resetPassword);

userRouter.use(authController.protect);

userRouter.patch('/updatePassword', authController.updatePassword);
userRouter.patch(
  '/updateMe',
  userController.uploadUserPhoto,
  userController.updateMe,
);
userRouter.delete('/deleteMe', userController.deleteMe);

userRouter.route('/me').get(userController.getMe, userController.getUser);

userRouter.use(authController.restrictTo('admin'));

userRouter
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

userRouter
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deletUser);

module.exports = userRouter;
