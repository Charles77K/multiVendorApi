const express = require('express');
const messageController = require('../controllers/messageController');
const authController = require('../controllers/authController');

const messageRouter = express.Router();

messageRouter.use(authController.protect);

messageRouter
  .route('/')
  .get(messageController.getMessages)
  .post(messageController.createMessage);

messageRouter.route('/:id').delete(messageController.deleteMessages);

module.exports = messageRouter;
