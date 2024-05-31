const mongoose = require('mongoose');
const { formatDistanceToNowStrict, format } = require('date-fns');

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

messageSchema.methods.getFormattedTimestamp = function () {
  const formattedDistance = formatDistanceToNowStrict(this.timestamp, {
    addSuffix: false,
  });

  // Parsing the result to get a more compact format
  if (formattedDistance.includes('minute')) {
    return formattedDistance.replace(' minute', 'm').replace(' minutes', 'm');
  }
  if (formattedDistance.includes('hour')) {
    return formattedDistance.replace(' hour', 'h').replace(' hours', 'h');
  }
  if (formattedDistance.includes('day')) {
    return formattedDistance.replace(' day', 'd').replace(' days', 'd');
  }
  if (formattedDistance.includes('month')) {
    return formattedDistance.replace(' month', 'm').replace(' months', 'm');
  }
  if (formattedDistance.includes('year')) {
    return formattedDistance.replace(' year', 'y').replace(' years', 'y');
  }
  return formattedDistance;
};

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
