
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
    recoveryPassword: {
        type: Object,
        default: null
    },
    storeName: {
        type: String,
        default: null
    },
    storeDescription: {
        type: String,
        default: null
    },
    storeImage: {
        type: String,
        default: null
    },
    storeAddress: {
        type: String,
        default: null
    },
    storePhone: {
        type: String,
        default: null
    },
    storeEmail: {
        type: String,
        default: null
    },
    storeUrl: {
        type: String,
        default: null
    },
});



UsuarioSchema.methods.toJSON = function () {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);
