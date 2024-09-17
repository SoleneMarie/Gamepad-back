const axios = require("axios");
const express = require("express");
const router = express.Router();

require("dotenv").config;

router.get("/", async (req, res) => {
  /* définir page-size, définir conditions : si recherche par nom, si recherche une page 
    en particulier, avec un ordre..; (par nom, par -released, -rating (added par défaut)) */
  let page_size = 48;
  let search = "";
  let ordering = "added";

  if (req.query.search) {
    search = req.query.search;
  }
  if (req.query.ordering) {
    if (req.query.ordering === "released") {
      ordering = "-released";
    } else if (req.query.ordering === "rating") {
      ordering = "-rating";
    } else if (req.query.ordering === "name") {
      ordering = "name";
    }
  }

  try {
    const data = await axios.get(
      `https://api.rawg.io/api/games?key=${process.env.API_KEY}&page_size=${page_size}&search=${search}&ordering=${ordering}`
    );
    res.status(200).json(data.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
