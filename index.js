const express = require('express');
    const swaggerUi = require('swagger-ui-express');
    const swaggerJsdoc = require('swagger-jsdoc');

    const app = express();
    const port = 80;

    const options = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'Random Number API with Conditional Status',
          version: '1.0.0',
          description: 'An API that returns a random number with a conditional status',
        },
        paths: {
          '/random': {
            get: {
              summary: 'Get a random number with conditional status',
              responses: {
                200: {
                  description: 'Successful response',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          number: {
                            type: 'number',
                            description: 'A random number'
                          },
                          status: {
                            type: 'string',
                            description: 'Status of the request',
                            enum: ['Completed', 'Failed']
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      apis: [],
    };

    const specs = swaggerJsdoc(options);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

    app.get('/random', (req, res) => {
      try {
        const randomNumber = Math.random();
        res.json({ number: randomNumber, status: "Completed" });
      } catch (error) {
        res.json({ status: "Failed" });
      }
    });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
