const swaggerDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Electron API',
      version: '1.0.0',
      description: 'This is the API for the online polling system',
    },
    servers: [
      { url: 'http://localhost:5000' }
      // Uncomment the line below for the production server
      // { url: 'https://busbuzz-server.onrender.com/' }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerDoc(options);

module.exports = {
  serveSwaggerUI: swaggerUI.serve,
  setupSwaggerUI: swaggerUI.setup(specs),
};
