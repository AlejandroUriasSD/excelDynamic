var excel = require('exceljs');
const excelType1 = require("../models/excelType1");
const excelType2 = require("../models/excelType2");
require('dotenv').config();
const colA = process.env.COLUMN_A
var moment = require("moment");
var requestModule = require("request");

const formatPhoneNumber = phoneNumber => {
    return "521" + phoneNumber.toString().replace(" ", "").replace("(", "").replace(")", "").replace("-", "")
}

const sendCovidResultadoIndeterminado = async (obj) => {
    var req = [
        {
            "telefono": formatPhoneNumber(obj.TelefonoCelular),
            "tipohsm": "covid_resultado_ind",
            "msj": ["6676890625"]
        }
    ];
    requestModule.post(
        'https://asistente-whatsbot.herokuapp.com/mensaje/envio',
        { json: req },
        function (error, response, body) {
            if (!error) {
                console.log('HSM ENVIADO', response);
            } else {
                console.log('ERROR AL ENVIAR HSM', error);
            }
        });
}
const insertRowsOfExcelType1 = async (row) => {
    try {
        const post = new excelType1({
            nombre: row.Nombre,
            paterno: row.Paterno,
            materno: row.Materno,
            telefonoCelular: row.TelefonoCelular,
            correoElectronico: row.CorreoElectronico.toString(),
            subEstudioVal: row.SubEstudioVal,
            fecha: moment.utc(row.Fecha).format(),
            sucursalVal: row.sucursalVal,
            fechaRegistro: moment.utc(row.FechaRegistro).format(),
            estatus: row.Estatus
        });
        await post.save();
    } catch (error) {
        res.send(error);
    }
}
const insertRowsOfExcelType2 = async (row) => {
    try {
        const post = new excelType2({
            nombre: colA ? colA : row.nombre,
            apellido1: row.apellido1,
            apellido2: row.apellido2,
            rfc: row.rfc,
            fechaCreacion: moment(row.fechaCreacion, 'MM-DD-YYYY HH:mm').utc().format("YYYY-MM-DD HH:mm")
        });
        await post.save();
    } catch (error) {
        res.send(error);
    }
}
const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index]);
    }
}
const handleFile = async (file) => {
    try {
        var workbook = new excel.Workbook();
        const wb = await workbook.xlsx.readFile(file.path);
        var workSheet = workbook.worksheets[0];
        var headers = workSheet.getRow(1).values;
        var obj = {};
        for (var i = 2; i <= workSheet._rows.length; i++) {
            headers.forEach((item, index) => {
                obj[item] = workSheet.getRow(i).values[index];
            });
            switch (file.model) {
                case "modelo1":
                    insertRowsOfExcelType1(obj);
                    sendCovidResultadoIndeterminado(obj);
                    break;
                case "modelo2":
                    insertRowsOfExcelType2(obj);
                    break;
            }
        }
    } catch (error) {
        res.send(error.message);
    }
}


const insertExcelFile = async (req, res) => {
    const models = JSON.parse(req.body.models);
    const files = req.files.files.map((item, index) => {
        item.model = models[index].model;
        return item;
    });
    await asyncForEach(files, handleFile);
    res.send("ok");
}

const insertExcelFile2 = (req, res) => {
    let promise = new Promise((resolve, reject) => {
        try {
            req.files.files.forEach((file, index) => {

            });
            resolve(true);
        } catch (error) {
            res.send(error.message);
        }
    });
    promise.then((result) => {
        if (result)
            res.send("ok");
    });
}


module.exports =
{
    insertExcelFile
}