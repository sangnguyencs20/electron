const express = require("express");
const app = express();
const { default: mongoose } = require('mongoose');
const cors = require("cors");
require("dotenv").config();
const verifyToken = require("./middleware/auth");

const swaggerDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Electron API',
      version: '1.0.0',
      description: 'This is the API for the online polling system'

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

const specs = swaggerDoc(options)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))



const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());





mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database');
  })
  .catch(() => {
    console.log(process.env.DATABASE_URL)
    console.log('Connection failed');
  })






app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});


app.get('/', (req, res) => {
  res.send('Hello World!');
});

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const opinionRouter = require('./routes/opinion');
const documentRouter = require('./routes/document');
const departmentRouter = require('./routes/department');


app.use("/auth", authRouter);
app.use("/users", verifyToken, userRouter);
app.use("/opinions", verifyToken, opinionRouter);
app.use("/documents", verifyToken, documentRouter);
app.use("/departments", verifyToken, departmentRouter);