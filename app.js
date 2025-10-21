const express = require('express');
const swaggerUi = require('swagger-ui-express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db/db');

const globalErrorHandler = require('./controllers/errorController');

const userRouter = require('./routes/userRoutes');
const restaurantRouter = require('./routes/restaurantRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const productRouter = require('./routes/productRoutes');
const messageRouter = require('./routes/messageRoutes');
const { swaggerSpec } = require('./swagger');

dotenv.config({
  path: './config.env',
});

//Serving static files
app.use(express.static('public'));

connectDB();

//Body parser, reading data from body into req.body
app.use(
  express.json({
    limit: '10kb',
  }),
);

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // If your app uses cookies or auth headers
  }),
);

// Logging
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// ✅ Serve Swagger static files manually
app.use(
  '/api-docs',
  express.static(path.join(__dirname, 'node_modules', 'swagger-ui-dist')),
);

// ✅ Swagger UI route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
