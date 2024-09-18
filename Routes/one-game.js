const axios = require("axios");
const express = require("express");
const router = express.Router();

require("dotenv").config;

router.get("/game/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let data = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${process.env.API_KEY}`
    );
    res.status(200).json(data.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
