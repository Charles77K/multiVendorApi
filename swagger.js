import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation',
    },
    components: {
      schemas: {
        Review: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '652a47a2d1a9b2e9f6dabcde',
            },
            review: {
              type: 'string',
              description: 'The review text',
              example: 'The food was amazing and the service was great!',
            },
            rating: {
              type: 'number',
              minimum: 1,
              maximum: 5,
              example: 5,
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2025-10-21T12:00:00Z',
            },
            restaurant: {
              type: 'string',
              description: 'ID of the restaurant being reviewed',
              example: '652a1bf8e32a64a29f3e4567',
            },
            User: {
              type: 'string',
              description: 'ID of the user who wrote the review',
              example: '652a2cf8a99b0e92a64a29c8',
            },
          },
          required: ['review', 'restaurant', 'User'],
        },
        User: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'The name of the user',
              example: 'John Doe',
            },
            email: {
              type: 'string',
              description: 'The email of the user',
              example: 'user@gmail.com',
            },
            img: {
              type: 'string',
              description: "User's profile image filename",
              example: 'default.jpg',
            },
            password: {
              type: 'string',
              description: "User's password",
              example: 'password123',
            },
            address: {
              type: 'string',
              description: "User's address",
              example: '123 Main Street',
            },
            phone: {
              type: 'string',
              description: "User's phone number",
              example: '123-456-7890',
            },
            passwordConfirm: {
              type: 'string',
              description: 'Password confirmation',
              example: 'password123',
            },
            passwordChangedAt: {
              type: 'string',
              format: 'date-time',
              description: 'When the password was last changed',
            },
            role: {
              type: 'string',
              enum: ['user', 'admin'],
              default: 'user',
            },
            active: {
              type: 'boolean',
              description: 'Whether the user account is active',
            },
          },
        },

        Product: {
          type: 'object',
          required: ['title', 'price', 'restaurant'],
          properties: {
            id: {
              type: 'string',
              description: 'Auto-generated product ID',
              example: '6715a8f9c0a5a600129d8b42',
            },
            title: {
              type: 'string',
              description: 'The name or title of the product',
              example: 'Classic Beef Burger',
            },
            price: {
              type: 'number',
              description: 'The regular price of the product',
              example: 15.99,
            },
            priceDiscount: {
              type: 'number',
              description:
                'Discounted price (must be less than the regular price)',
              example: 12.99,
            },
            image: {
              type: 'string',
              description: 'URL or path of the product image',
              example: 'https://example.com/uploads/burger.jpg',
            },
            restaurant: {
              type: 'string',
              description: 'The ID of the restaurant this product belongs to',
              example: '67159d9f43a5c50012b6e321',
            },
          },
          example: {
            id: '6715a8f9c0a5a600129d8b42',
            title: 'Classic Beef Burger',
            price: 15.99,
            priceDiscount: 12.99,
            image: 'https://example.com/uploads/burger.jpg',
            restaurant: '67159d9f43a5c50012b6e321',
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'], // your route file paths
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);

export function swaggerDocs(app, port) {
  console.log(`📘 Swagger Docs available at http://localhost:${port}/api-docs`);
}
