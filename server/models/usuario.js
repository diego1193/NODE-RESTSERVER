// Se crea la tabla de usuarios ///
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); //utilizar unique
// es un cascaron o medelo para crear los usuarios
let Schema = mongoose.Schema;

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} NO ES UN ROLE VALIDO'
};
// Se hace el esquema o tabla con los valores que necesitamos
let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        unique: true, //se utiliza para indicar q solamente puede a ver un correo por usuario
        type: String,
        required: [true, 'Correo necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']

    },
    img: {
        type: String,
        required: false
    }, // no es obligatoria
    role: {
        default: 'USER_ROLE',
        type: String,
        enum: rolesValidos
            //required: [true, 'el role es obligatorio']
    },
    estado: {
        default: true,
        type: Boolean,
        // required: [true, 'El estado es Obligaatorio']
    }, // boolean
    google: {
        default: false,
        type: Boolean,
        // required: [true, 'eL API de Google es obligatorio']
    } // boolean

}, { collation: 'Usuarios' });

///// Para eliminar el passwor del json q se envia, pero aun sigue existiendo el password///

usuarioSchema.methods.toJSON = function() { /// TODO: todos los metodos de usuarioShema van a estar aqui
    let user = this; // seleccionado el objeto que se va mostrar mediante json
    let userObject = user.toObject(); // con user.toObject() que me traiga todos lod objetos
    delete userObject.password; /// cuando me trajo los objetos que me borre el password

    return userObject /// retorna con el objeto borrado
}

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' }) /// para que el email sea unico 
module.exports = mongoose.model('Usuario', usuarioSchema);