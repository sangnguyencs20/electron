const express = require("express");
const app = express();
const { default: mongoose } = require('mongoose');
const cors = require("cors");
require("dotenv").config();
const verifyToken = require("./middleware/auth");

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
app.use("/user", verifyToken, userRouter);
app.use("/opinion", verifyToken, opinionRouter);
app.use("/document", verifyToken, documentRouter);
app.use("/department", verifyToken, departmentRouter);