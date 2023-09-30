// MODELS
const CategoryListMoviesModel = require("../models/CategoryMovie");

const categoryMovieCtrl = {
  createCategoryListMovies: async (req, res, next) => {
    const newCategoryListMovies = new CategoryListMoviesModel(req.body);
    try {
      const savedCategoryListMovies = await newCategoryListMovies.save();
      res.status(201).json(savedCategoryListMovies);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  ////////////////////////////////
  // GET ALL CATEGORY LIST MOVIES
  ////////////////////////////////
  getAllCategoryListMovies: async (req, res, next) => {
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
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
  },
};

module.exports = categoryMovieCtrl;
