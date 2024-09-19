const axios = require("axios");
const express = require("express");
const router = express.Router();

router.get("/game/:id/screenshots", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await axios.get(
      `https://api.rawg.io/api/games/${id}/screenshots?key=${process.env.API_KEY}`
    );
    res.status(200).json(data.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
