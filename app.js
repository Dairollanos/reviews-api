require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const app = express();

const authRoutes = require("./routes/authRoutes");
const booksRoutes = require("./routes/booksRoutes");
const moviesRoutes = require("./routes/moviesRoutes");
const seriesRoutes = require("./routes/seriesRoutes");
const reviewsRoutes = require("./routes/reviewsRoutes");
const port = 3001;

mongoose
  .connect(process.env.DBURI)
  .then((result) => app.listen(port))
  .catch((error) => console.log(error));

app.use(passport.initialize());
app.use(express.json());
app.use("/user", authRoutes);
app.use("/books", booksRoutes);
app.use("/movies", moviesRoutes);
app.use("/series", seriesRoutes);
app.use("/reviews", reviewsRoutes);
