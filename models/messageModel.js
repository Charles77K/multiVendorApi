const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  User: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

messageSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'User',
    select: 'name img',
  });
  next();
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
