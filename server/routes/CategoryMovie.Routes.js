const router = require("express").Router();
// "express-fileupload" : Permet de récupérer les fichiers transmis par les clients
// CONTROLLERS
const categoryMovieCtrl = require("../controllers/CategoryMovieCtrl");

// router.get("/", (req, res) => {
//   res.status(400).json({ message: "test" });
// });

router
  .route("/")
  .get(categoryMovieCtrl.getAllCategoryListMovies)
  .post(categoryMovieCtrl.createCategoryListMovies);
// router.route("/randomMovie").get(categoryMovieCtrl.getRandomMovie);
// router
//   .route("/allMoviesByCriteria")
//   .get(categoryMovieCtrl.getAllMoviesByCriteria);
// router.route("/sortByMovieGenre").get(categoryMovieCtrl.getSortByMovieGenre);

// router.route("/:id").get(categoryMovieCtrl.getMovie);

module.exports = router;
