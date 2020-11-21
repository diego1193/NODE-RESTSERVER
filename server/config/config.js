//================================
//// PUERTO
//

//VA CONFIGURAR EL PUERTO EN EL QUE SE ESCUCHA///
process.env.PORT = process.env.PORT || 3000;

////////////////////////
//entorno
//////////////////

///SI EXISTE LO ESTOY CORRIENDO EN PRODUCCION
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

////////////////
// BASE DE DATOS
///////////////

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/apid'; // SI EXISTE ENTOCES ES LOCAL
} else {
    urlDB = process.env.MONGO_URI
        //urlDB = 'mongodb+srv://diego1193:1193108557c@cluster0.uswxv.mongodb.net/apid' // DE LO CONTRARIO ES POR URL
}

process.env.urlDB = urlDB;

//mongodb://localhost:27017/apid

//mongodb+srv://diego1193:1193108557c@cluster0.uswxv.mongodb.net/apid