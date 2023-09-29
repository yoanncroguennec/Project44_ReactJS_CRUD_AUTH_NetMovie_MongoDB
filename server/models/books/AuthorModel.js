const mongoose = require("mongoose");

const AuthorModel = new mongoose.Schema(
  {
    name: { type: String, required: true },
    books: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
    date: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Author", AuthorModel);
