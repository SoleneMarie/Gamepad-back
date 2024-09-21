const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../Models/User");

const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

router.post("/user/login", async (req, res) => {
  try {
    console.log(req.body);

    if (!req.body.username || !req.body.password) {
      res.status(400).json({ message: "warning, empty fields" });
    } else {
      const userFound = await User.findOne({ username: req.body.username });
      if (!userFound) {
        res
          .status(400)
          .json({ message: "no account existing for this username" });
      } else {
        const checkPass = SHA256(req.body.password + userFound.salt).toString(
          encBase64
        );
        if (checkPass === userFound.hash) {
          res.status(200).json(userFound);
        } else {
          res.status(500).json({ message: "wrong password" });
        }
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
