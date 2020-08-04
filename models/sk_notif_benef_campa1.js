const mongoose = require("mongoose");

const schema = mongoose.Schema({
  region: String,
  division: String,
  plaza: String,
  tipoCanal: String,
  nombreCliente: String,
  telefono: String,
  mensaje: String,
  createdDate:String
});

module.exports = mongoose.model("sk_notif_benef_campa1", schema);