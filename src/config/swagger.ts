import swaggerJSDoc from 'swagger-jsdoc';
import { env } from './env';

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ne\'ma API Documentation',
      version: '1.0.0',
      description: 'API documentation for Ne\'ma Foodstuffs backend services',
    },
    servers: [
      {
        url: env.NODE_ENV === 'production' 
          ? 'https://nema-api.example.com/api/v1' 
          : `http://localhost:${env.PORT || 5000}/api/v1`,
        description: env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token to authenticate requests',
        },
      },
    },
    // We don't apply security globally because public routes (like register) don't need it.
    // We will apply security per-route in the annotations.
  },
  // Look for swagger comments in all routes files inside the modules directory
  apis: ['./src/modules/**/*.routes.ts'],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
