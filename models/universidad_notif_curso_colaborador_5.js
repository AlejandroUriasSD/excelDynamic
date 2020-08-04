const mongoose = require("mongoose");

const schema = mongoose.Schema({
  IdColaborador: String,
  nombreCompleto: String,
  acceso: String,
  telefono: String,
  estatus1: String,
  cursoInduccion: String,
  nombreCurso: String,
  estatus2: String,
  createdDate: String
});

module.exports = mongoose.model("universidad_notif_curso_colaborador_5", schema);