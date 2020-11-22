const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const Usuario = require('../models/usuario');


app.post('/login', (req, res) => {

    let { email, password } = req.body;

    // me interesa regresar solo uno
    Usuario.findOne({ email }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'usuario) o contraseña incorrectos'
                }
            });
        }

        if (!bcrypt.compareSync(password, usuarioDB.password)) {

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'usuario o contraseña incorrectos'
                }
            });

        }

        //Para crear el token
        let token = jwt.sign({ // con el jwt.sign
            usuario: usuarioDB // la informacion o data
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN }); // el mesnaje y el tiempo en el q el token expira

        res.json({
            ok: true,
            usuario: usuarioDB,
            token: token
        })


    });


    // res.json({
    //     ok: true
    // });
});


module.exports = app;