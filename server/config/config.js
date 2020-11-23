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


//================================
//// VENCIMUENTO DEL TOKEN
//============================
//60 MIN
// 60 SG
// 24 HRS
// 30 DIAS

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;





//================================
//// SEED SEMILLA DE AUTENTICACION 
//============================

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

//================================
//// Google client ID
//============================

process.env.CLIENT_ID = process.env.CLIENT_ID || '7322003600-ftugpvikcs6jjkfgdq3rn3klcl74nm85.apps.googleusercontent.com';