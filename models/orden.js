const { Schema, model } = require('mongoose');

const OrdenSchema = Schema({
    /*
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }, */
    total: {
        type: Number,
        default: 0
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
    /* categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    descripcion: { type: String },
    disponible: { type: Boolean, defult: true },
    img: { type: String }, */
});


/* OrdenSchema.methods.toJSON = function () {
    const { __v, _id, ...data } = this.toObject();
    return data;
} */


module.exports = model('Orden', OrdenSchema);
