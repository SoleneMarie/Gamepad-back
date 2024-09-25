const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());
require("dotenv").config();

const games = require("./Routes/games");
app.use(games);
const game = require("./Routes/one-game");
app.use(game);
const screenshots = require("./Routes/screenshots");
app.use(screenshots);
const genres = require("./Routes/genres");
app.use(genres);
const genresID = require("./Routes/genresID");
app.use(genresID);
const platforms = require("./Routes/platforms");
app.use(platforms);
const stores = require("./Routes/stores");
app.use(stores);
const signup = require("./Routes/signup");
app.use(signup);
const login = require("./Routes/login");
app.use(login);
const userProfile = require("./Routes/user-profile");
app.use(userProfile);
const favourites = require("./Routes/save-favorite");
app.use(favourites);
const gamesGenres = require("./Routes/games-genres");
app.use(gamesGenres);

/*const checkConnect = require("./check-connect");
app.use(checkConnect);*/

app.all("*", (req, res) => {
  try {
    res.status(200).json({ message: "Whoops, wrong way! ⛔️" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started" /*, process.env */);
});
