const express = require('express');
const bcrypt = require('bcrypt'); /// para incriptar 
const _ = require('underscore'); // en el put para seleccionar los avlores que
const app = express();
const Usuario = require('../models/usuario'); // el modelo para crear la tabala en mongoose
const { verificaToken, vereficaAdmin_Role } = require('../middlewares/autenticacion');
const usuario = require('../models/usuario');

//////informacion que estamos obpteniendo/////
app.get('/usuario', verificaToken, (req, res) => {

    // return res.json({
    //     usuario: req.usuario,
    //     nombre: req.usuario.nombre,
    //     email: req.usuario.email

    // });

    // TODO: en postman despues del /usuario?limite=10&desde=10, para indicar parametros opciobales

    //los parametros opcionales caen en query
    let desde = req.query.desde || 0; // desde q numero de usuarios
    desde = Number(desde); // para volverlo numero

    let limite = req.query.limite || 0; // hasta q numero de usuarios
    limite = Number(limite);
    /// regrese todos los usuarios y se utiliza Usuario.find({})
    // dendtro del find({},'email google ...') en esas comillas van todo lo que yo quiero mostrar
    Usuario.find({ estado: true }, 'nombre email role img estado google')
        .skip(desde) // desde que numero o usuario los empiezo a mostrar
        .limit(limite) // limite de los usuarios q se requiere
        .exec((err, usuarios) => { //ejecutalo, todas las funciones de mongoose resive un resultado y un error
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            // para saber cuantos usuarios hay//
            Usuario.count({ estado: true }, (err, conteo) => {

                res.json({
                    ok: true,
                    usuarios: usuarios,
                    conteo: conteo
                });
            });
        });
})


/////////crear registros////////
app.post('/usuario', [verificaToken, vereficaAdmin_Role], (req, res) => {


    ///TODO: AQUI VA IR LO DE BODY///
    let body = req.body

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }
        // usuarioDB.password = null;

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });
})

/////////actualizar data///////
app.put('/usuario/:id', [verificaToken, vereficaAdmin_Role], (req, res) => {



    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado', ]);

    // solamente algunos campos se van actualizar se utilza el delete

    // delete body.password;
    // delete body.google;

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

    // res.json({
    //     id
    // });
})

/////////borrar datos o registros/////
app.delete('/usuario/:id', [verificaToken, vereficaAdmin_Role], (req, res) => {




    let id = req.params.id;

    // Con este se borra toatalmente
    // Usuario.findByIdAndRemove(id, body, { new: true }, (err, usuarioBorrado) => {

    let cambioEstado = {
        estado: false
    };
    // coloco el estado en falso, para "Borrar", aunque queda guardado
    Usuario.findByIdAndUpdate(id, cambioEstado, { new: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err

            })
        }
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'el usuario ya se elimino'
                }
            });
        }
        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    });
});

module.exports = app;