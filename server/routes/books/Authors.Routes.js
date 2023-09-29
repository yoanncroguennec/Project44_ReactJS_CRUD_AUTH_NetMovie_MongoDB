// Appel à la fonction Router(), issue du package 'express'
const router = require("express").Router();
// CONTROLLERS
const authorCtrl = require("../../controllers/books/BookCtrl");



// router.get("/", (req, res) => {
//   res.json("Bienvenue sur l'API");
// });
router.post("/createAuthor", authorCtrl.createAuthor);
router.post("/createBook", authorCtrl.createBook);
router.get("/show", authorCtrl.showAll);
// router.get("/author/:id", authorCtrl.getAuthor);

module.exports = router;
  