const mongoose = require("mongoose");

const schema = mongoose.Schema({
  usuario: String,
  nombreCompleto: String,
  telefono: String,
  curso: String,
  estatus: String,
  createdAt:String
});

module.exports = mongoose.model("univ_notif_curso_covid_1", schema);