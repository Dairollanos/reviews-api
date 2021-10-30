const router = require("express").Router();
const Movies = require("../model/Movies");
const passport = require("../auth/passport");

const moviesValidations = require("../validation/moviesValidations");
const validationResults = require("../validation/validationResults");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      registeredMovies = await Movies.find();
      return res.status(200).json(registeredMovies);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
);

router.post(
  "/",
  moviesValidations,
  validationResults,
  passport.authenticate("jwt", { session: false }),
  async function (req, res) {
    const { name, producer, duration, cast } = req.body;
    try {
      createdMovie = await Movies.create({
        name,
        producer,
        duration,
        cast,
      });
      if (createdMovie) return res.status(201).json({ Movie: createdMovie });
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
      return res.status(200).json({ book: req.movieFound });
    }
  )
  .put(
    moviesValidations,
    validationResults,
    passport.authenticate("jwt", { session: false }),
    async function (req, res) {
      const { name, producer, duration, cast } = req.body;

      try {
        await Movies.updateOne(
          { _id: req.id },
          { name, producer, duration, cast }
        );
        return res.status(200).json({ success: "Movie updated successfully" });
      } catch (error) {
        return res
          .status(500)
          .json({ error: "Something went wrong!, movie not updated" });
      }
    }
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    async function (req, res) {
      try {
        await Movies.deleteOne({ _id: req.id });
        return res.status(204).send();
      } catch (error) {
        return res
          .status(500)
          .json({ error: "Something went wrong!, movie not deleted" });
      }
    }
  );

router.param("id", async (req, res, next, id) => {
  try {
    req.id = id;
    registeredMovie = await Movies.findById(id);
    req.movieFound = registeredMovie;
    next();
  } catch (error) {
    return res.status(404).json({ error: "Movie not found" });
  }
});
module.exports = router;
