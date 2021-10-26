if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const app = express();
const authRoutes = require("./routes/authRoutes");
const port = 3001;

mongoose
  .connect(process.env.DBURI)
  .then((result) => app.listen(port))
  .catch((error) => console.log(error));

app.use(passport.initialize());
app.use(express.json());
app.use("/", authRoutes);
