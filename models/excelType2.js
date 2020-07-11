const mongoose = require("mongoose");

const schema = mongoose.Schema({
  nombre: String,
  apellido1: String,
  apellido2: String,
  rfc: String,
  fechaCreacion: String
});

module.exports = mongoose.model("excelType2", schema);