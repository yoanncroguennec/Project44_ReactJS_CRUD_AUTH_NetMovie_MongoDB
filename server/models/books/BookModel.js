const mongoose = require("mongoose");

const BookModel = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },
    date: Date,
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Book", BookModel);
