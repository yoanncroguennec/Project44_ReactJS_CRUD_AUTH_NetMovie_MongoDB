const router = require("express").Router();
// "express-fileupload" : Permet de récupérer les fichiers transmis par les clients
// CONTROLLERS
const userCtrl = require("../controllers/UserCtrl");

// router.get("/", (req, res) => {
//   res.status(400).json({ message: "test" });
// });

router.route("/").get(userCtrl.getAllUsers);
router.route("/:id").get(userCtrl.getUser);

module.exports = router;
