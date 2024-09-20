const axios = require("axios");
const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY_CLOUDINARY,
  api_secret: process.env.API_SECRET_CLOUDINARY,
});

const mongoose = require("mongoose");
const User = require("../Models/User");

mongoose.connect(process.env.MONGODB_URI);

const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

/* ------------------- fonction de conversion du data de l'image ------------------- */
const convertPicture = (file) => {
  return `data:${file.mimetype};base64,${file.data.toString("base64")}`;
};

/* --------------------------------------------------------------------------------- */

router.post("/user/signup", fileUpload(), async (req, res) => {
  try {
    const { username, email, password, confirmPassword, isEighteen } = req.body;
    const pictureData = req.files.picture;
    /*console.log(pictureData);   OK  */

    /* --------------  GESTION DES ERREURS POSSIBLES -------------- */

    if (!username || !email || !password || !confirmPassword) {
      res.status(400).json({ message: "warning, empty fields!" });
    } else if (password !== confirmPassword) {
      res.status(400).json({ message: "warning, different passwords" });
    } else if (await User.findOne({ username: username })) {
      res
        .status(409)
        .json({ message: "warning, account existing for this username" });
    } else if (await User.findOne({ email: email })) {
      res
        .status(409)
        .json({ message: "warning, account existing for this email" });
    } else if (password.length < 10) {
      res
        .status(400)
        .json({ message: "warning, password too short (10 mini)" });

      /*   All OK  */
      /* ------------------------ SI LES DONNEES RECUES SONT OK ------------------------- */
    } else {
      /* console.log("else");  OK  */
      const pictureConverted = await convertPicture(pictureData);
      /* console.log("image convertie : ", pictureConverted);   OK   */
      let result;
      try {
        result = await cloudinary.uploader.upload(pictureConverted);
        console.log("resultat cloudinary", result);
      } catch (error) {
        console.log("erreur d'upload", error);
        res.status(500).json({ message: error.message });
      }

      const salt = uid2(16);
      const hash = SHA256(password + salt).toString(encBase64);
      const token = uid2(32);
      const newUser = new User({
        username: username,
        email: email,
        picture: result.secure_url,
        salt: salt,
        hash: hash,
        token: token,
        isEighteen: isEighteen,
      });
      await newUser.save();
      res
        .status(200)
        .json({ message: "Account created successfully!", account: newUser });
    }
  } catch (error) {
    res.status(500);
  }
});

module.exports = router;
