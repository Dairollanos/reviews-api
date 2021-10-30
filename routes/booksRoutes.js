const router = require("express").Router();
const Books = require("../model/Books");
const passport = require("../auth/passport");

const booksValidations = require("../validation/booksValidations");
const validationResults = require("../validation/validationResults");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      registeredBooks = await Books.find();
      return res.status(200).json(registeredBooks);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
);

router.post(
  "/",
  booksValidations,
  validationResults,
  passport.authenticate("jwt", { session: false }),
  async function (req, res) {
    const { name, editorial, author } = req.body;
    try {
      createdBook = await Books.create({
        name,
        editorial,
        author,
      });
      if (createdBook) return res.status(201).json({ Book: createdBook });
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
      return res.status(200).json({ book: req.bookFound });
    }
  )
  .put(
    booksValidations,
    validationResults,
    passport.authenticate("jwt", { session: false }),
    async function (req, res) {
      const { name, editorial, author } = req.body;

      try {
        await Books.updateOne({ _id: req.id }, { name, editorial, author });
        return res.status(200).json({ success: "Book updated successfully" });
      } catch (error) {
        return res
          .status(500)
          .json({ error: "Something went wrong!, book not updated" });
      }
    }
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    async function (req, res) {
      try {
        await Books.deleteOne({ _id: req.id });
        return res.status(204).send();
      } catch (error) {
        return res
          .status(500)
          .json({ error: "Something went wrong!, book not deleted" });
      }
    }
  );

router.param("id", async (req, res, next, id) => {
  try {
    req.id = id;
    registeredBook = await Books.findById(id);
    req.bookFound = registeredBook;
    next();
  } catch (error) {
    return res.status(404).json({ error: "Book not found" });
  }
});
module.exports = router;
