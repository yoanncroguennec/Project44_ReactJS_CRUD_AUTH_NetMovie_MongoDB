// MODELS
const Authors = require("../../utils/assets/data/data.json");
const Book = require("../../models/books/BookModel");
const Author = require("../../models/books/AuthorModel");

const authorCtrl = {
  createAuthor: async (req, res, next) => {
    try {
      for (let author of Authors) {
        var newAuthor = new Author(author);
        await newAuthor.save();
      }

      res.json("Authors created");
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },

  ////////
  //
  ////////
  createBook: async (req, res, next) => {
    try {
      const jkRowling = await Author.findOne({ name: "J.K. Rowling" });
      const tonnyRobbins = await Author.findOne({ name: "Tony Robbins" });

      let harryPotter = new Book({
        title: "Harry Potter",
        author: jkRowling._id,
      });
      let awakenGiant = new Book({
        title: "Awaken the Giant Within",
        author: tonnyRobbins._id,
      });

      await harryPotter.save();
      await awakenGiant.save();

      jkRowling.books.push(harryPotter);
      tonnyRobbins.books.push(awakenGiant);

      await jkRowling.save();
      await tonnyRobbins.save();

      res.json("Books created");
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },

  showAll: async (req, res, next) => {
  try {
    const authors = await Book.find().populate("author");
    res.json(authors);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
    // try {
    //   const authors = await Author.find().populate("books");
    //   res.json(authors);
    // } catch (err) {
    //   res.status(404).json({ message: err.message });
    // }
  },
};

module.exports = authorCtrl;
