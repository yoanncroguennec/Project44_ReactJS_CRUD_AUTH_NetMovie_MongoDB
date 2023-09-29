const mongoose = require("mongoose");

const CategoryMovieSchema = new mongoose.Schema({
  nameCategory: { type: String, required: true },
  listMovies: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "movie",
  },
  realisators: { type: String },
  actors: { type: String },
  desc: { type: String },
  trailer: { type: String },
  favorite: { type: Boolean, default: false },
  watch: { type: Boolean, default: false },
  country: { type: String },
  productionCompany: { type: String },
  movieLink: { type: String },
  img: { type: String, required: true },
  year: { type: Number },
  genre: { type: [String], required: true },
  rating: { type: Number },
  date: Date,
});

module.exports = mongoose.model("categoryMovie", CategoryMovieSchema);
