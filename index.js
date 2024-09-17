const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());
require("dotenv").config();

const games = require("./Routes/games");
app.use(games);
/*const checkConnect = require("./check-connect");
app.use(checkConnect);*/

app.all("*", (req, res) => {
  res.status(200).json({ message: "Whoops, wrong way! ⛔️" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started" /*, process.env */);
});
