require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes.js");
const cors = require('cors');

const port = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("mongodb connected successfully"))
  .catch((err) => {
    console.log("err at mongodb ", err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Configure CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, 
}));

app.use('/', userRoutes);
app.use('/user', userRoutes);

app.listen(port, () => console.log(`app listening at http://localhost:${port}`));
