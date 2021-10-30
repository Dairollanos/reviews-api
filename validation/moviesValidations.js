const { check } = require("express-validator");

const moviesValidations = [
  check("name").trim().notEmpty().withMessage("Name of the movie is required"),
  check("producer")
    .trim()
    .notEmpty()
    .withMessage("Producer of the movie is required"),
  check("duration")
    .trim()
    .notEmpty()
    .withMessage("Duration of the movie is required")
    .isNumeric()
    .withMessage("Duration must be the number of minutes"),
];

module.exports = moviesValidations;
