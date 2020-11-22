 const { json } = require('body-parser');
 const jwt = require('jsonwebtoken');

 ///
 ///VERIFICAR TOKEN
 //==================

 let verificaToken = (req, res, next) => {

         let token = req.get('token'); // me trae el token de postman

         // verifica el token
         jwt.verify(token, process.env.SEED, (err, decoded) => {
                 if (err) {
                     return res.status(401).josn({
                         ok: false,
                         err: {
                             message: 'token no valido'
                         }
                     });

                 }
                 req.usuario = decoded.usuario; // me trae el usuario 
                 next();

             })
             //  res.json({
             //      token: token
             //  });
             //  next(); /// para que verifique y siga en la funcio app.get
     }
     ///
     ///VERIFICAR ADMIN ROLE
     //==================

 let vereficaAdmin_Role = (req, res, next) => {
     let usuario = req.usuario;

     if (usuario.role === 'ADMIN_ROLE') {

         next();
     } else {
         return res.json({
             ok: false,
             err: {
                 message: 'El usuario no es administrador'
             }
         });
     }
 };

 module.exports = {
     verificaToken,
     vereficaAdmin_Role
 }