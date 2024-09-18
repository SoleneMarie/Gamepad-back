const axios = require("axios");
const express = require("express");
const router = express.Router();

router.get("/genres/:id", async (req, res) => {
  try {
    const idGenre = req.params.id;
    const data = await axios.get(
      `https://api.rawg.io/api/genres/${idGenre}?key=${process.env.API_KEY}`
    );
    res.status(200).json(data.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
