// RegExp : Permet de chercher si certains éléments sont présent (Ex: Présence du "@" dans l'email) / Cours "Le Réacteur" à 10min de la vidéo "Cours sur les Filters", catégorie "Back", Jour 6
// MODEL
const AuthModel = require("../models/Auth");

const userCtrl = {
  ///////////////////
  //// GET MOVIE BY ID ////
  ///////////////////
  getUser: async (req, res, next) => {
    try {
      const user = await AuthModel.findById(req.params.id);

      res.json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  ///////////////////////
  //// GET ALL USERS ////
  ///////////////////////
  getAllUsers: async (req, res, next) => {
    try {
      // Second Step
      const users = await AuthModel.find();

      // Compte les Docs correspondant au filtre
      const count = await AuthModel.countDocuments();

      const response = {
        count: count,
        users: users,
      };

      res.json(response);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

module.exports = userCtrl;
