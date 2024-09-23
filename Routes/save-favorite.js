const axios = require("axios");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../Models/User");

router.put("/user/favorites/:id", async (req, res) => {
  try {
    const userToModify = await User.findById(req.params.id);
    if (
      userToModify.favourites.length > 0 &&
      userToModify.favourites.includes(req.body.favorites)
    ) {
      userToModify.favourites.splice(
        userToModify.favourites.indexOf(req.body.favorites)
      );
      res.status(200).json({ message: "removed from your favorites" });
    } else {
      userToModify.favourites.push(req.body.favorites);
      res.status(200).json({ message: "added to your favorites" });
    }
    await userToModify.save();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
