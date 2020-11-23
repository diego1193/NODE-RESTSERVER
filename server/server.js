////Trae la carpoeta de configuracion del puerto///
require('./config/config');

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

//// Todo lo que el usuario requiera en el postman "Nombre y edad"
//TODO:va a quedar grabado en el siguienre codigo y va ir al app.gest TODO:
const bodyParser = require('body-parser')
    // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) /// el .use sirve para que cada peticion que hagamos pase por esas lineas

// parse application/json
app.use(bodyParser.json())

//app.use(require('./rutas/rutas'));

//Configuracion glogal de rutas
app.use(require('./rutas/index'));

//Pra que vaya y me corra todo lo q esta en public
app.use(express.static(path.resolve(__dirname, '../public')));



// app.use(require('./rutas/login'));
/// coneccion a mongodb
mongoose.connect(process.env.urlDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err, res) => {
    if (err) throw err;
    console.log('Base de datos ONLINE')
});
app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto', 3000);
});