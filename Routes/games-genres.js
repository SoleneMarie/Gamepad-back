const axios = require("axios");
const express = require("express");
const router = express.Router();

router.get(`/games/:genres`, async (req, res) => {
  let genreID;
  if (req.params.genres) {
    genreID = req.params.genres;
  }
  let page_size = 50;
  let search = "";
  let ordering = "added";
  let page = 1;
  let tags = "";
  console.log(genreID);
  if (req.query.search) {
    search = req.query.search;
  }
  if (req.query.page) {
    page = req.query.page;
  }
  if (req.query.pagesize) {
    page_size = req.query.pagesize;
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
  if (req.query.tags) {
    tags = req.query.tags;
  }
  console.log(
    `https://api.rawg.io/api/games?genres=${genreID}&search=${search}&ordering=${ordering}&page_size=${page_size}&key=${process.env.API_KEY}`
  );

  try {
    const data = await axios.get(
      `https://api.rawg.io/api/games?genres=${genreID}&search=${search}&ordering=${ordering}&page_size=${page_size}&key=${process.env.API_KEY}`
    );
    res.status(200).json(data.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
