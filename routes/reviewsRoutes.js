const router = require("express").Router();
const Reviews = require("../model/Reviews");
const passport = require("../auth/passport");

const {
  reviewsValidations,
  reviewsUpdateValidations,
} = require("../validation/reviewsValidations");
const validationResults = require("../validation/validationResults");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      registeredReviews = await Reviews.find();
      return res.status(200).json(registeredReviews);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
);

router.post(
  "/",
  reviewsValidations,
  validationResults,
  passport.authenticate("jwt", { session: false }),
  async function (req, res) {
    const { type, subject, rating, comment } = req.body;
    try {
      createdReview = await Reviews.create({ type, subject, rating, comment });
      if (createdReview) return res.status(201).json({ Book: createdReview });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
);

router
  .route("/:id")
  .get(
    passport.authenticate("jwt", { session: false }),
    async function (req, res) {
      return res.status(200).json({ book: req.reviewFound });
    }
  )
  .put(
    reviewsUpdateValidations,
    validationResults,
    passport.authenticate("jwt", { session: false }),
    async function (req, res) {
      const { rating, comment } = req.body;
      const reviewFound = req.reviewFound;

      try {
        await Reviews.updateOne(
          { _id: req.id },
          {
            type: reviewFound.type,
            subject: reviewFound.subject,
            rating,
            comment,
          }
        );
        return res.status(200).json({ success: "Review updated successfully" });
      } catch (error) {
        return res
          .status(500)
          .json({ error: "Something went wrong!, review not updated" });
      }
    }
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    async function (req, res) {
      try {
        await Reviews.deleteOne({ _id: req.id });
        return res.status(204).send();
      } catch (error) {
        return res
          .status(500)
          .json({ error: "Something went wrong!, review not deleted" });
      }
    }
  );

router.param("id", async (req, res, next, id) => {
  try {
    req.id = id;
    registeredReview = await Reviews.findById(id);
    req.reviewFound = registeredReview;
    next();
  } catch (error) {
    return res.status(404).json({ error: "Review not found" });
  }
});
module.exports = router;
