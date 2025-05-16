const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const express = require('express');
const router = express.Router();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Contacts API',
      version: '1.0.0',
      description: 'A simple CRUD API for managing contacts',
    },
    servers: [
      {
        url: 'https://cse340-st3g.onrender.com', // our url on render.com (web service)
      },
    ],
  },
  apis: ['./routes/*.js'], // Read JSDoc from all routes
};

const swaggerSpec = swaggerJSDoc(options);

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;
