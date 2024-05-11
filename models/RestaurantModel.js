const mongoose = require('mongoose');
const slugify = require('slugify');

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A restaurant must have a name'],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    slug: String,
    img: String,
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        description: String,
      },
    ],
    contact: [
      {
        phone: Number,
        email: {
          type: String,
          lowercase: true,
          trim: true,
        },
      },
    ],
    menu: [
      {
        name: {
          type: String,
          required: [true, 'A menu item must have a name'],
        },
        description: String,
        price: {
          type: Number,
          required: [true, 'A menu item must have a price'],
          min: [0, 'Price cannot be negative'],
        },
        image: String,
      },
    ],
    openingHours: [
      {
        day: {
          type: Number,
          required: [
            true,
            'Day of the week must be specified for opening hours',
          ],
          min: 0,
          max: 7,
        },
        open: String,
        close: String,
        status: {
          type: String,
          default: 'Open',
          enum: ['Open', 'Closed'],
        },
      },
    ],
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be at above 1.0'],
      max: [5, 'Ratings must be below 5.0'],
      set: function (val) {
        return Math.round(val * 10) / 10;
      },
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Pre-save hook to generate slug
restaurantSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

//Virtual populate
restaurantSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'restaurant',
  localField: '_id',
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
