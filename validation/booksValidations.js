const { check } = require("express-validator");

const booksValidations = [
  check("name").trim().notEmpty().withMessage("Name of the book is required"),
  check("editorial")
    .trim()
    .notEmpty()
    .withMessage("Editorial of the book is required"),
  check("author")
    .trim()
    .notEmpty()
    .withMessage("Author of the book is required"),
];

module.exports = booksValidations;
