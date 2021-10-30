const { validationResult } = require("express-validator");

const validationResults = function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};

module.exports = validationResults;
