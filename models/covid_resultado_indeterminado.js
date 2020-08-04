const mongoose = require("mongoose");

const schema = mongoose.Schema({
  nombre: String,
  paterno: String,
  materno: String,
  telefono: String,
  correo: String,
  subEstudioVal: String,
  fecha: String,
  sucursalVal: String,
  fechaRegistro: String,
  estatus: Number,
  createdDate: String
});

module.exports = mongoose.model("covid_resultado_indeterminado", schema);