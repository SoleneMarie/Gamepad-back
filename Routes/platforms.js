const axios = require("axios");
const express = require("express");
const router = express.Router();

router.get("/platforms", async (req, res) => {
  let pagesize = 20;
  let page = 1;

  pagesize = req.query.page_size;
  page = req.query.page;

  try {
    const data = await axios.get(
      `https://api.rawg.io/api/platforms?key=${process.env.API_KEY}&page=${page}&page_size=${pagesize}`
    );
    res.status(200).json(data.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
