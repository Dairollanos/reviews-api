const { check } = require("express-validator");
const User = require("../model/Users");

const signUpValidations = [
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is missing, write one")
    .isEmail()
    .withMessage("Email must be a correct email"),
  check("email").custom((email) => {
    return User.findOne({ email }).then((user) => {
      if (user) {
        return Promise.reject("E-mail already in use");
      }
    });
  }),
  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password is missing, write one")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters long"),
];

module.exports = signUpValidations;
