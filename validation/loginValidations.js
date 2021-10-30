const { check } = require("express-validator");

const loginValidations = [
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is missing, write one")
    .isEmail()
    .withMessage("Email must be a correct email"),
];

module.exports = loginValidations;
