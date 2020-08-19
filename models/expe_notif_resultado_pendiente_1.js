const mongoose = require("mongoose");

const schema = mongoose.Schema({
  fechaNacimiento: String,
  RSV: String,
  paciente: String,
  clinica: String,
  telefono: String,
  createdDate:String
});

module.exports = mongoose.model("expe_notif_resultado_pendiente_1", schema);