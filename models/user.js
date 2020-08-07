const mongoose = require("mongoose");

const schema = mongoose.Schema({
  user: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("user", schema);