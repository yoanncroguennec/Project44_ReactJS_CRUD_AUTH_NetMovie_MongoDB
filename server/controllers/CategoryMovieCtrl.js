// MODELS
const CategoryListMoviesModel = require("../models/CategoryMovie");

const categoryMovieCtrl = {
  createCategoriesListMovies: async (req, res, next) => {
    const newCategoryListMovies = new CategoryListMoviesModel(req.body);
    try {
      const savedCategoryListMovies = await newCategoryListMovies.save();
      res.status(201).json(savedCategoryListMovies);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  ////////////////////////////////
  // DELETE BY ID CATEGORY LIST MOVIES
  ////////////////////////////////
  deleteByID_CategoryListMovies: async (req, res, next) => {
    // if (req.user.isAdmin) {
    try {
      await CategoryListMoviesModel.findByIdAndDelete(req.params.id);
      res.status(201).json("The list has been delete...");
    } catch (err) {
      res.status(500).json(err);
    }
    // } else {
    //   res.status(403).json("You are not allowed!");
    // }
  },

  ////////////////////////////////
  // GET ALL CATEGORIES LIST MOVIES
  ////////////////////////////////
  getAllCategoriesListMovies: async (req, res, next) => {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let list = [];

    try {
      if (typeQuery) {
        if (genreQuery) {
          list = await CategoryListMoviesModel.aggregate([
            { $sample: { size: 10 } },
            { $match: { type: typeQuery, genre: genreQuery } },
          ]);
        } else {
          list = await CategoryListMoviesModel.aggregate([
            { $sample: { size: 10 } },
            { $match: { type: typeQuery } },
          ]);
        }
      } else {
        list = await CategoryListMoviesModel.aggregate([
          { $sample: { size: 10 } },
        ]);
      }

      const count = await CategoryListMoviesModel.countDocuments();

      const response = {
        count: count,
        list: list,
      };

      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = categoryMovieCtrl;
