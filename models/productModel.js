const mongoose = require('mongoose');
const validator = require('validator');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A product title must be provided'],
    },
    price: {
      type: Number,
      required: [true, 'A product price must be provided'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price; // 100 < 200
        },
        message: 'Discount price ({VALUE}) should be lower than regular price',
      },
    },
    image: String,
    restaurant: {
      type: mongoose.Schema.ObjectId,
      ref: 'Restaurant',
      required: [true, 'A product must belong to a restaurant'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Middleware for find operations
productSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'restaurant',
    select: 'name',
  });
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
