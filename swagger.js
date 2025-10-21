import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DineSphere Multi-Vendor API',
      version: '1.0.0',
      description: 'API documentation for the DineSphere Multi-Vendor Platform',
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
        Restaurant: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Name of the restaurant',
              example: 'Golden Spoon',
            },
            description: {
              type: 'string',
              description: 'Brief description of the restaurant',
              example:
                'A fine dining restaurant specializing in African cuisine.',
            },
            slug: {
              type: 'string',
              description: 'URL-friendly version of the restaurant name',
              example: 'golden-spoon',
            },
            img: {
              type: 'string',
              description:
                "Image filename or URL for the restaurant's display photo",
              example: 'restaurant.jpg',
            },
            locations: {
              type: 'array',
              description: 'Geographical locations of the restaurant',
              items: {
                type: 'object',
                properties: {
                  type: {
                    type: 'string',
                    enum: ['Point'],
                    default: 'Point',
                    description: 'GeoJSON type for the location',
                  },
                  coordinates: {
                    type: 'array',
                    description:
                      'Geographical coordinates [longitude, latitude]',
                    items: {
                      type: 'number',
                      example: 7.49508,
                    },
                    example: [7.49508, 9.072264],
                  },
                  description: {
                    type: 'string',
                    description: 'Description of the location',
                    example: 'Main branch at Lekki Phase 1, Lagos',
                  },
                },
              },
            },
            contact: {
              type: 'array',
              description: "Restaurant's contact details",
              items: {
                type: 'object',
                properties: {
                  phone: {
                    type: 'number',
                    description: 'Phone number of the restaurant',
                    example: 2348012345678,
                  },
                  email: {
                    type: 'string',
                    description: 'Email address of the restaurant',
                    example: 'contact@goldenspoon.com',
                  },
                },
              },
            },
            menu: {
              type: 'array',
              description: 'Menu items offered by the restaurant',
              items: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    description: 'Name of the menu item',
                    example: 'Jollof Rice with Grilled Chicken',
                  },
                  description: {
                    type: 'string',
                    description: 'Description of the dish',
                    example:
                      'Classic Nigerian Jollof Rice served with grilled chicken.',
                  },
                  price: {
                    type: 'number',
                    description: 'Price of the menu item',
                    example: 2500,
                    minimum: 0,
                  },
                  image: {
                    type: 'string',
                    description: 'Image filename or URL for the menu item',
                    example: 'jollof-chicken.jpg',
                  },
                },
              },
            },
            openingHours: {
              type: 'array',
              description: 'Opening hours for each day of the week',
              items: {
                type: 'object',
                properties: {
                  day: {
                    type: 'integer',
                    minimum: 0,
                    maximum: 7,
                    description: 'Day of the week (0 = Sunday, 7 = Saturday)',
                    example: 1,
                  },
                  open: {
                    type: 'string',
                    description: 'Opening time in HH:mm format',
                    example: '08:00',
                  },
                  close: {
                    type: 'string',
                    description: 'Closing time in HH:mm format',
                    example: '22:00',
                  },
                  status: {
                    type: 'string',
                    enum: ['Open', 'Closed'],
                    default: 'Open',
                    description: 'Restaurant status for that day',
                  },
                },
              },
            },
            ratingsAverage: {
              type: 'number',
              description: 'Average rating of the restaurant (1.0 - 5.0)',
              default: 4.5,
              example: 4.7,
            },
            ratingsQuantity: {
              type: 'number',
              description: 'Total number of ratings received',
              default: 0,
              example: 125,
            },
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
