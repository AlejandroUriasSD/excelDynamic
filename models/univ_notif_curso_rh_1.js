const mongoose = require("mongoose");

const schema = mongoose.Schema({
  nombreCompleto: String,
  telefono: String,
  programa: String,
  usuario: String,
  contraseña: String
});

module.exports = mongoose.model("univ_notif_curso_rh_1", schema);