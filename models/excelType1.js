const mongoose = require("mongoose");

const schema = mongoose.Schema({
  nombre: String,
  paterno: String,
  materno: String,
  telefonoCelular: String,
  correoElectronico: String,
  subEstudioVal: String,
  fecha: String,
  sucursalVal: String,
  fechaRegistro: String,
  estatus: Number
});

module.exports = mongoose.model("excelType1", schema);