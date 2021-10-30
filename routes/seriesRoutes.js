const router = require("express").Router();
const Series = require("../model/Series");
const passport = require("../auth/passport");

const seriesValidations = require("../validation/seriesValidations");
const validationResults = require("../validation/validationResults");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      registeredSeries = await Series.find();
      return res.status(200).json(registeredSeries);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
);

router.post(
  "/",
  seriesValidations,
  validationResults,
  passport.authenticate("jwt", { session: false }),
  async function (req, res) {
    const { name, producer, seasons } = req.body;
    try {
      createdSerie = await Series.create({
        name,
        producer,
        seasons,
      });
      if (createdSerie) return res.status(201).json({ Serie: createdSerie });
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
      return res.status(200).json({ book: req.serieFound });
    }
  )
  .put(
    seriesValidations,
    validationResults,
    passport.authenticate("jwt", { session: false }),
    async function (req, res) {
      const { name, producer, seasons } = req.body;

      try {
        await Series.updateOne({ _id: req.id }, { name, producer, seasons });
        return res.status(200).json({ success: "Serie updated successfully" });
      } catch (error) {
        return res
          .status(500)
          .json({ error: "Something went wrong!, serie not updated" });
      }
    }
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    async function (req, res) {
      try {
        await Series.deleteOne({ _id: req.id });
        return res.status(204).send();
      } catch (error) {
        return res
          .status(500)
          .json({ error: "Something went wrong!, serie not deleted" });
      }
    }
  );

router.param("id", async (req, res, next, id) => {
  try {
    req.id = id;
    registeredSerie = await Series.findById(id);
    req.serieFound = registeredSerie;
    next();
  } catch (error) {
    return res.status(404).json({ error: "Serie not found" });
  }
});
module.exports = router;
