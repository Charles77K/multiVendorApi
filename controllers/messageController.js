const Message = require('../models/messageModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

exports.createMessage = catchAsync(async (req, res, next) => {
  const { content } = req.body;
  const userId = req.user.id;
  const message = await Message.create({ User: userId, content });
  res.status(201).json({
    status: 'success',
    data: message,
  });
});

exports.getMessages = catchAsync(async (req, res, next) => {
  const message = await Message.find()
    .populate('User', 'name img email')
    .sort({ timestamp: -1 });
  res.status(200).json({
    status: 'success',
    data: message,
  });
});

exports.deleteMessages = factory.deleteOne(Message);
