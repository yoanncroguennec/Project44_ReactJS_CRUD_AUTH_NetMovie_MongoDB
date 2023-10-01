const router = require("express").Router();
const categoryMovieCtrl = require("../controllers/CategoryMovieCtrl");

// router.get("/", (req, res) => {
//   res.status(400).json({ message: "test" });
// });

router
  .route("/")
  .get(categoryMovieCtrl.getAllCategoriesListMovies)
  .post(categoryMovieCtrl.createCategoriesListMovies);

router.route("/:id").delete(categoryMovieCtrl.deleteByID_CategoryListMovies);

module.exports = router;
