const axios = require("axios");
const express = require("express");
const router = express.Router();

router.use("/stores", async (req, res) => {
  try {
    const data = await axios.get(
      `https://api.rawg.io/api/stores?key=${process.env.API_KEY}`
    );
    res.status(200).json(data.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
