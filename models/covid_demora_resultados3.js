const mongoose = require("mongoose");

const schema = mongoose.Schema({
    consultorio: String,
    estatusCita: String,
    nombre: String,
    paterno: String,
    materno: String,
    fechaNacimiento: String,
    correo: String,
    telefono: String,
    fechaRegistro: String,
    estatus: String,
    IdCitaSisPrevencion: String,
    IdOrdenPago: String,
    origenCita: String,
    IdTarjetaExento: String,
    IdTipoPago: String,
    sucursalVal: String,
    sucursalId: String,
    subEstudioVal: String,
    fecha: String,
    horarioText: String,
    IdHorarioConsultorio: String,
    origenCita: String,
    createdDate: String,
    tiempo: String
});

module.exports = mongoose.model("covid_demora_resultados3", schema);