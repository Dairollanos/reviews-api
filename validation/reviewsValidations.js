const { check } = require("express-validator");

const reviewsValidations = [
  check("type")
    .trim()
    .notEmpty()
    .withMessage("Type of review is required")
    .isIn(["movie", "book", "serie"])
    .withMessage("Type must be 'movie', 'book' or 'serie'"),
  check("subject")
    .trim()
    .notEmpty()
    .withMessage("Subject of the review is required")
    .isMongoId()
    .withMessage("Subject must be a correct Mongo ID"),
  check("rating")
    .trim()
    .notEmpty()
    .withMessage("Duration of the movie is required")
    .isInt({ min: 1, max: 10 })
    .withMessage("Duration must be a number between 1 and 10"),
];

const reviewsUpdateValidations = [
  check("rating")
    .trim()
    .notEmpty()
    .withMessage("Duration of the movie is required")
    .isInt({ min: 1, max: 10 })
    .withMessage("Duration must be a number between 1 and 10"),
];

module.exports = { reviewsValidations, reviewsUpdateValidations };
