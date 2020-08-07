const user = require('../models/user');
const jwt = require('jsonwebtoken');
const key = require('../utils/token');

function getToken(userId) {
    const payload = {
        userId: userId
    };
    return jwt.sign(payload, key.key, {
        expiresIn: 60 * 60
    });
}

const authenticate = (req, res) => {
    console.log(req.body);
    user.findOne({ email: req.body.user }, (erro, usuarioDB) => {
        // if (erro) {
        //     return res.status(500).json({
        //         status: false,
        //         err: erro
        //     });
        // }
        // if (!usuarioDB || !(req.body.password === usuarioDB.password)) {
        //     return res.status(400).json({
        //         status: false,
        //         err: {
        //             message: "Usuario o contraseña incorrectos"
        //         }
        //     });
        // }
        //usuarioDB.token = getToken("usuarioDB.id");
        return res.status(200).json({
            status: true,
            data: {
                usuario: {
                    id: "usuarioDB.id",
                    name: "usuarioDB.name",
                    email: "usuarioDB.email",
                    token: getToken("usuarioDB.id")
                }
            }
        });
    });
}

module.exports = {
    authenticate,
}