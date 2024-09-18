const axios = require("axios");
const express = require("express");
const router = express.Router();
router.use(express.json);

/*
axios
  .get(`https://api.rawg.io/api/games?key=${process.env.API_KEY}`)
  .then((res) => {
    console.log("response : ", res.data);
  })
  .catch((error) => {
    console.log("error response : ", error);
  });

console.log(process.env.API_KEY.slice(0, 2) + process.env.API_KEY.slice(-2));

module.exports = router;
*/
