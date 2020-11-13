////Trae la carpoeta de configuracion del puerto///
require('./config/config');

const express = require('express');
const app = express();

//// Todo lo que el usuario requiera en el postman "Nombre y edad"
//TODO:va a quedar grabado en el siguienre codigo y va ir al app.gest TODO:
const bodyParser = require('body-parser')
    // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) /// el .use sirve para que cada peticion que hagamos pase por esas lineas

// parse application/json
app.use(bodyParser.json())


//////informacion que estamos obpteniendo/////
app.get('/usuario', (req, res) => {
    res.json('get usuarios');
})


/////////crear registros////////
app.post('/usuario', (req, res) => {

    ///TODO: AQUI VA IR LO DE BODY///
    let body = req.body

    //// Dentro de este if va los mensajes de error al code status "400, 200"
    if (body.nombre === undefined) {

        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        });

    } else {

        res.json({

            persona: body //// TODO: SE GUARDA EN UN TIPO JSON 
        });

    }
})

/////////actualizar data///////
app.put('/usuario/:id', (req, res) => {

    let id = req.params.id;
    res.json({
        id
    });
})

/////////borrar datos o registros/////
app.delete('/usuario', (req, res) => {
    res.json('Delete usuarios');
})

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto', 3000);
});