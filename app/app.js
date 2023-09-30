const express = require("express");
const cors = require("cors");
const ip = require("ip");
const app = express();
app.use(express.json());
app.set("trust proxy", true);
app.use(cors());

// Routes
app.get("/", (req, res) => {
  // res.json("Bienvenue sur l'API");
  // // res.status(300).json({ message: "Bienvenue sur l'API" });
  const userIp = req.ip
  console.log(userIp);
  // const userIp = ip.address();
  // console.log(userIp);
  // const iup = ip.isV4Format("127.0.0.1");
  // console.log(iup);
  // const ee = ip.isV6Format();
  // console.log(ee);
  //   const aa = ip.isPrivate();
  //   console.log(aa);

  res.send(userIp);
  // return res.json({ userIp });
});
app.use("/api/movies", require("../server/routes/Movies.Routes"));
app.use("/api/auth", require("../server/routes/Auth.Routes"));
app.use("/api/users", require("../server/routes/Users.Routes"));
// Books
app.use("/api/categoryListMovie", require("../server/routes/CategoryMovie.Routes"));

// ROUTES UNDEFINED
app.all("*", (req, res) => {
  res.status(404).json({ message: "Cette route n'existe pas" });
});

module.exports = app;
