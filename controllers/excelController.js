var excel = require('exceljs');
const covid_resultado_indeterminado = require("../models/covid_resultado_indeterminado");
const universidad_notif_curso_colaborador_5 = require("../models/universidad_notif_curso_colaborador_5");
const covid_demora_resultados3 = require("../models/covid_demora_resultados3");
const sk_notif_benef_campa1 = require("../models/sk_notif_benef_campa1");
const univ_notif_curso_rh_1 = require("../models/univ_notif_curso_rh_1");
const expe_notif_resultado_pendiente_1 = require("../models/expe_notif_resultado_pendiente_1");
const univ_notif_curso_covid_1 = require("../models/univ_notif_curso_covid_1");
require('dotenv').config();
const colA = process.env.COLUMN_A
var moment = require("moment");
var requestModule = require("request-promise");
const requestPromise = require('request-promise');

const formatPhoneNumber = phoneNumber => {
    return "521" + phoneNumber.replace(/[^\d]/g, '');
}

const sendHsm = async (req) => {
    try {
        requestModule.post(
            'https://asistente-whatsbot.herokuapp.com/mensaje/envio',
            { json: req },
            function (error, response) {
                if (!error) {
                    console.log('HSM ENVIADO', response);
                } else {
                    console.log('ERROR AL ENVIAR HSM', error);
                }
            });
    } catch (error) {
        console.log(error);
    }
}

const insertModel = async (model) => {
    try {
        if (model.telefono)
            await model.save();
        return true;
    } catch (error) {
        return error;
    }
}

const browseFiles = async (array, callback, res) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], res);
    }
}

const getMsj = async (obj) => {
    return obj
}

const getRequest = async (telefono, hsmType, msj) => {
    return {
        "telefono": telefono,
        "tipohsm": hsmType,
        "msj": msj
    }
}
const getUniv_notif_curso_covid_1Model = async (row) => {
    try {
        return new univ_notif_curso_covid_1({
            usuario: row[1],
            nombreCompleto: row[2],
            telefono: formatPhoneNumber(row[3].toString()),
            curso: row[4],
            estatus: row[5],
            createdDate: moment()
        })
    } catch (error) {
        console.log(error);
    }
}
const getSkNotificacionModel = async (row) => {
    try {
        return new sk_notif_benef_campa1({
            region: row[1],
            division: row[2],
            plaza: row[3],
            tipoCanal: row[4],
            nombreCliente: row[5],
            telefono: formatPhoneNumber(row[6].toString()),
            mensaje: row[7],
            createdDate: moment()
        })
    } catch (error) {
        console.log(error);
    }
}
const getUniv_notif_curso_rh_1 = async (row) => {
    try {
        return new univ_notif_curso_rh_1({
            nombreCompleto: row[1],
            telefono: formatPhoneNumber(row[2].toString()),
            programa: row[3],
            usuario: row[4],
            contraseña: row[5]
        })
    } catch (error) {
        console.log(error);
    }
}
const getCovidDemoraResultadosModel = async (row) => {
    try {
        return new covid_demora_resultados3({
            consultorio: row[1],
            estatusCita: row[2],
            nombre: row[3],
            paterno: row[4],
            materno: row[5],
            fechaNacimiento: moment.utc(row[6]).format(),
            correo: row[7],
            telefono: formatPhoneNumber(row[8].toString()),
            fechaRegistro: row[9],
            estatus: row[10],
            IdCitaSisPrevencion: row[11],
            IdOrdenPago: row[12],
            origenCita: row[13],
            IdTarjetaExento: row[14],
            IdTipoPago: row[15],
            sucursalVal: row[16],
            sucursalId: row[17],
            subEstudioVal: row[18],
            fecha: moment.utc(row[19]).format(),
            horarioText: row[20],
            IdHorarioConsultorio: row[21],
            origenCita: row[22],
            createdDate: moment.utc(row[23]).format(),
            tiempo: row[24],
            createdAt: moment()
        });

    } catch (error) {
        console.log(error);
    }

}

const getCovidIndeterminadoModel = async (row) => {
    return new covid_resultado_indeterminado({
        nombre: row[1],
        paterno: row[2],
        materno: row[3],
        telefono: formatPhoneNumber(row[4].toString()),
        correo: row[5].text || row[5],
        subEstudioVal: row[6],
        fecha: moment.utc(row[7]).format(),
        sucursalVal: row[8],
        fechaRegistro: moment.utc(row[9]).format(),
        estatus: row[10],
        createdDate: moment()
    })
}

const getUniversidadCursoColaboradorModel = async (row) => {
    return new universidad_notif_curso_colaborador_5({
        IdColaborador: row[1],
        nombreCompleto: row[2],
        acceso: row[3],
        telefono: formatPhoneNumber(row[4].toString()),
        estatus1: row[5],
        cursoInduccion: row[6],
        nombreCurso: row[7],
        estatus2: row[8],
        createdDate: moment()
    })
}
const getExpe_notif_resultado_pendiente_1_M_model = async (row) => {
    return new expe_notif_resultado_pendiente_1({
        fechaNacimiento: row[1],
        RSV: row[2],
        paciente: row[3],
        clinica: row[4],
        telefono: formatPhoneNumber(row[5].toString()),
        createdDate: moment()
    })
}

const handleFile = async (file, res) => {
    try {
        var workbook = new excel.Workbook();
        const wb = await workbook.xlsx.readFile(file.path);
        var workSheet = workbook.worksheets[0];
        var arrayRequest = [];
        var req = {};
        maxofRequest = 300;
        var message, model, result;
        for (const [i, row] of workSheet._rows.entries()) {
            if (i >= 1) {
                if (row.values.length > 0) {
                    switch (file.model) {
                        case "covid_resultado_indeterminado":
                            model = await getCovidIndeterminadoModel(row.values);
                            message = await getMsj([model.telefono]);
                            break;
                        case "universidad_notif_curso_colaborador_5":
                            model = await getUniversidadCursoColaboradorModel(row.values);
                            message = await getMsj([model.nombreCompleto, model.nombreCurso, model.estatus2, moment(model.acceso).format("YYYY-MM-DD"), "universidad@salud-digna.org", "https://universidad.salud-digna.org/"]);
                            break;
                        case "covid_demora_resultados3":
                            model = await getCovidDemoraResultadosModel(row.values);
                            message = await getMsj([model.tiempo]);
                            break;
                        case "sk_notif_benef_campa1":
                            model = await getSkNotificacionModel(row.values);
                            message = await getMsj(["premia", "beneficios"]);
                            break;
                        case "univ_notif_curso_rh_1":
                            model = await getUniv_notif_curso_rh_1(row.values);
                            message = await getMsj([model.nombreCompleto, model.programa, "https://universidad.salud-digna.org", model.usuario, model.contraseña, "fortalecimientoemocional@salud-digna.org"])
                            break;
                        case "expe_notif_resultado_pendiente_1":
                            model = await getExpe_notif_resultado_pendiente_1_M_model(row.values);
                            message = await getMsj(['6676890627']);
                        case "univ_notif_curso_covid_1":
                            model = await getUniv_notif_curso_covid_1Model(row.values);
                            message = await getMsj([model.nombreCompleto, model.curso, model.estatus])
                    }
                    result = await insertModel(model);
                    if (result) {
                        req = await getRequest(model.telefono, file.model, message)
                        arrayRequest.push(req);
                    }
                }
            }
        };
        const reqInParts = await divideRequest(arrayRequest, maxofRequest)
        for (value of reqInParts.entries()) {
            await sendHsm(value[1]);
        }
    } catch (error) {
        res.send(error.message);
    }
}

const divideRequest = async (arrayRequest, maxofRequest) => {
    return new Array(Math.ceil(arrayRequest.length / maxofRequest))
        .fill()
        .map(_ => arrayRequest.splice(0, maxofRequest))
}

const insertExcelFile = async (req, res) => {
    const models = JSON.parse(req.body.models);
    const files = req.files.files.map((item, index) => {
        item.model = models[index].model;
        return item;
    });
    await browseFiles(files, handleFile, res);
    res.send("ok");
}

module.exports =
{
    insertExcelFile
}