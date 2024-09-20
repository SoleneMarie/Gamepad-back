const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://SolenePlassart:MDBclu83@cluster0.qyurk.mongodb.net/gamepad"
);

const User = mongoose.model("User", {
  username: { type: String, required: true },
  email: { type: String, required: true },
  picture: String,
  salt: String,
  hash: String,
  token: String,
  isEighteen: { type: Boolean, default: false },
});

module.exports = User;
