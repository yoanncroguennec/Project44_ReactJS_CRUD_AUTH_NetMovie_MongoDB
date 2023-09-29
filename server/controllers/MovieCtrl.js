// RegExp : Permet de chercher si certains éléments sont présent (Ex: Présence du "@" dans l'email) / Cours "Le Réacteur" à 10min de la vidéo "Cours sur les Filters", catégorie "Back", Jour 6
// MODEL
const MovieModel = require("../models/Movie");

const movieCtrl = {
  ///////////////////
  //// CREATE MOVIE ////
  ///////////////////
  createMovie: async (req, res, next) => {
    try {
      const {
        name,
        realisators,
        actors,
        desc,
        trailer,
        favorite,
        watch,
        country,
        productionCompany,
        movieLink,
        img,
        year,
        rating,
      } = req.body;
      // if (
      //   // Les champs OBLIGATOIRE a remplir
      //   req.body.name &&
      //   req.body.img &&
      //   req.body.genre
      // ) {
      // STEP 1 : Create New Movie

      //   req.body.img &&
      //   req.body.genre
      // ) {
      // STEP 1 : Create New Movie
      const newMovie = new MovieModel({
        name: name,
        realisators: realisators,
        actors: actors,
        desc: desc,
        trailer: trailer,
        favorite: favorite,
        watch: watch,
        country: country,
        productionCompany: productionCompany,
        movieLink: movieLink,
        img: img,
        year: year,
        genre: genre,
        rating: rating,
      });

      // Les champs que l'user à remplit (pas forcément obligatoire)
      // name: req.body.name,
      // realisators: req.body.realisators,
      // actors: req.body.actors,
      // desc: req.body.desc,
      // trailer: req.body.trailer,
      // favorite: req.body.favorite,
      // watch: req.body.watch,
      // country: req.body.country,
      // productionCompany: req.body.productionCompany,
      // movieLink: req.body.movieLink,
      // img: req.body.img,
      // year: req.body.year,
      // genre: req.body.genre,
      // rating: req.body.rating,
      // });

      // STEP 2 : sauvegarder ce nouvel user dans la BDD
      await newMovie.save();
      // ATTENTION !! Affiche le résultat sur Postman que quand on lance le server depuis l'api direct et non par la dépendance concurrently"" de Front-end (client)
      res.status(201).json(newMovie);
      // res.status(201).json({
      //   name: newMovie.name,
      //   realisators: newMovie.realisators,
      //   actors: newMovie.actors,
      //   desc: newMovie.desc,
      //   trailer: newMovie.trailer,
      //   favorite: newMovie.favorite,
      //   watch: newMovie.watch,
      //   country: newMovie.country,
      //   productionCompany: newMovie.productionCompany,
      //   movieLink: newMovie.movieLink,
      //   img: newMovie.img,
      //   year: newMovie.year,
      //   genre: newMovie.genre,
      //   rating: newMovie.rating,
      // });
      // return res.status(400).json(res);
      // res.json(res);
      // } else {
      //   // l'utilisateur n'a pas envoyé les informations requises ?
      //   res.status(400).json({ message: "Paramètres manquants" });
      // }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  ///////////////////
  //// GET MOVIE BY ID ////
  ///////////////////
  getMovie: async (req, res, next) => {
    try {
      const movie = await MovieModel.findById(req.params.id);
      // "populate()" : Permet de référencer des documents dans d'autres collections
      // .populate("owner", "account");

      res.json(movie);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  /////////////////////////////////
  //// GET SORT BY MOVIE GENRE ////
  /////////////////////////////////
  getSortByMovieGenre: async (req, res, next) => {
    try {
      const movies = await MovieModel.find({ genre: req.query.genre });

      res.status(200).json(movies);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  //////////////////////////
  //// GET RANDOM MOVIE ////
  //////////////////////////
  getRandomMovie: async (req, res, next) => {
    try {
      const movies = await MovieModel.find({});

      const randomMovie = movies[Math.floor(Math.random() * movies.length)];
      console.log("randomMovie :", randomMovie);
      res.status(200).json(randomMovie);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  ///////////////////////
  //// GET ALL MOVIES ////
  ///////////////////////
  getAllMovies: async (req, res, next) => {
    try {
      //! création d'un objet dans lequel on va stocker nos différents filtres
      let filters = {};

      if (req.query.name) {
        filters.product_name = new RegExp(req.query.name, "i");
      }

      let sort = {};

      if (req.query.sort === "nameMovie-desc") {
        sort = { name: -1 };
      } else if (req.query.sort === "nameMovie-asc") {
        sort = { name: 1 };
      }

      let page;

      if (Number(req.query.page) < 1) {
        page = 1;
      } else {
        page = Number(req.query.page);
      }

      //   SKIP ET LIMIT
      let limit = Number(req.query.limit);
      // console.log(page, limit);
      //.skip(10) // = sauter l'affichage des 10 premières annonces

      const movies = await MovieModel.find(
        filters
        // { product_name: new RegExp("sac", "i") },
        // { product_price: { $gte: 50, $lte: 150 } }
      )
        .sort(sort)
        .limit(limit) // renvoyer y résultats
        .skip((page - 1) * limit); // ignorer les x résultats
      // .select("product_name product_price")
      // .populate({
      //   path: "owner",
      //   select: "account",
      // });
      //.countDo
      const total = await MovieModel.countDocuments({});

      const response = {
        total,
        movies,
      };

      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  /////////////////////////////////////
  //// GET ALL MOVIES BY CRITERIA ////
  ////////////////////////////////////
  getAllMoviesByCriteria: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) - 1 || 0;
      const limit = parseInt(req.query.limit) || 99;
      const search = req.query.search || "";
      let sort = req.query.sort || "rating";
      let genre = req.query.genre || "All";

      const genreOptions = [
        "Action",
        "Romance",
        "Super-héros",
        "Fantastique",
        "Drame",
        "Comédie",
        "Crime",
        "Adventure",
        "Thriller",
        "Horreur",
        "Animation",
        "Science-fiction",
        "Musical",
        "En famille",
        "Gangsters",
        "Histoire vraie",
      ];

      genre === "All"
        ? (genre = [...genreOptions])
        : (genre = req.query.genre.split(","));
      req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

      let sortBy = {};
      if (sort[1]) {
        sortBy[sort[0]] = sort[1];
      } else {
        sortBy[sort[0]] = "asc";
      }

      const movies = await MovieModel.find({
        name: { $regex: search, $options: "i" },
      })
        .where("genre")
        .in([...genre])
        .sort(sortBy)
        .skip(page * limit)
        .limit(limit);

      const total = await MovieModel.countDocuments({
        genre: { $in: [...genre] },
        name: { $regex: search, $options: "i" },
      });

      const response = {
        error: false,
        total,
        page: page + 1,
        limit,
        genres: genreOptions,
        movies,
      };

      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: true, message: "Internal Server Error" });
    }
  },
};

module.exports = movieCtrl;
