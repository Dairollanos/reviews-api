const { check } = require("express-validator");

const seriesValidations = [
  check("name").trim().notEmpty().withMessage("Name of the serie is required"),
  check("producer")
    .trim()
    .notEmpty()
    .withMessage("Producer of the serie is required"),
  check("seasons")
    .trim()
    .notEmpty()
    .withMessage("Duration of the serie is required")
    .isNumeric()
    .withMessage("Seasons must be a number"),
];

module.exports = seriesValidations;
