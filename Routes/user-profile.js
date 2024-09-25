const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../Models/User");

router.get("/user/profile/:id", async (req, res) => {
  let id;
  if (req.params.id) {
    id = req.params.id;
  }
  const data = await User.findById(id);
  res.status(200).json(data);
});

module.exports = router;
