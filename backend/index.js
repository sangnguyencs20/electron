const express = require("express");
const app = express();
const { default: mongoose } = require('mongoose');
const cors = require("cors");
require("dotenv").config();

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
app.use("/auth", authRouter);