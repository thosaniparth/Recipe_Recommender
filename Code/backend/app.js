const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const app = express();
const colors = require("colors");
const connectDB = require('./config/db.js');
const {notFound, errorHandling} = require('./middleware/errorhandling.js')

colors.enable();

const cors = require('cors');
app.use(express.json());

dotenv.config();

connectDB();

app.use(express.urlencoded());
app.use(cors({ credentials: true }));
app.use(cors());

app.use(notFound, errorHandling);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const {signInRouter, signUpRouter} = require('./routes/user.js');

app.get("/", async(req, res) => {
  console.log("Hello");
  res.send("Hello");
});

app.use("/signIn", signInRouter);
app.use("/signUp", signUpRouter);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

module.exports = {
  app
}
