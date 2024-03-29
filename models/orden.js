const { Schema, model } = require('mongoose');

const OrdenSchema = Schema({
    total: {
        type: Number,
        default: 0
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    activo: {
        type: Boolean,
        default: true,
        required: true
    },
    productos: [{
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: true
    }],
    carrito: {
        type: Object,
        ref: 'Carrito',
        required: true
    },
    usuarioComprador: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    usuarioVendedor: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    metodoPago: {
        type: Object,
        ref: 'metodoPago',
        required: true
    },
});


/* OrdenSchema.methods.toJSON = function () {
    const { __v, _id, ...data } = this.toObject();
    return data;
} */


module.exports = model('Orden', OrdenSchema);
