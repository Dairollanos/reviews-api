const router = require("express").Router();
const passport = require("../auth/passport");
const jwt = require("jsonwebtoken");

const validationResults = require("../validation/validationResults");
const signUpValidations = require("../validation/signUpValidations");
const loginValidations = require("../validation/loginValidations");
const { check } = require("express-validator");

router.post(
  "/signup",
  signUpValidations,
  validationResults,
  passport.authenticate("signup", { session: false }),
  async function (req, res) {
    res.status(200).json({ message: "Sign up Successfully" });
  }
);

router.post(
  "/login",
  loginValidations,
  validationResults,
  async function (req, res, next) {
    passport.authenticate("login", async (err, user, info) => {
      try {
        if (err || !user) {
          return res.status(400).json({ error: info.error });
        }

        req.login(user, { session: false }, async (err) => {
          if (err) return next(err);
          const body = { _id: user._id, email: user.email };
          const token = jwt.sign({ user: body }, "top_secret");
          return res.status(200).json({ token });
        });
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  }
);

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      message: "This is your profile",
      user: req.user,
    });
  }
);

module.exports = router;
