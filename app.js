const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const app = express();
const cors = require('cors');
const globalErrorHandler = require('./controllers/errorController');

const userRouter = require('./routes/userRoutes');
const restaurantRouter = require('./routes/restaurantRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const productRouter = require('./routes/productRoutes');
const messageRouter = require('./routes/messageRoutes');
//Serving static files
app.use(express.static('public'));

//Body parser, reading data from body into req.body
app.use(
  express.json({
    limit: '10kb',
  }),
);

app.use(
  cors({
    origin: 'http://localhost:3000', // Replace with your frontend's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // If your app uses cookies or auth headers
  }),
);

app.use('/api/v1/restaurant', restaurantRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/message', messageRouter);
app.use('/api/v1/booking', bookingRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Couldn't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
