const { mongoose } = require('mongoose');
const { response } = require('express');
const { Orden } = require('../models');

const obtenerOrdenes = async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { activo: true };

    const [total, ordenes] = await Promise.all([
        Orden.countDocuments(query),
        Orden.find(query)
            .populate('idOrden', 'total')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        ordenes
    });
}

/* const obtenerCategoria = async(req, res = response ) => {

    const { id } = req.params;
    const categoria = await Categoria.findById( id )
                            .populate('usuario', 'nombre');

    res.json( categoria );

} */

const crearOrden = async (req, res = response) => {

    /*  const idOrden = req.body.nombre.toUpperCase();
 
     const categoriaDB = await Categoria.findOne({ nombre });
 
     if ( categoriaDB ) {
         return res.status(400).json({
             msg: `La categoria ${ categoriaDB.nombre }, ya existe`
         });
     } */

    //create unique mongodb id
    //const idOrden = new mongoose.Types.ObjectId();

    // Generar la data a guardar
    const data = {
        total: 119.99,
    }

    const orden = new Orden(data);

    console.log('orden a crear ' + orden);
    // Guardar DB
    //save order with unique id
    await orden.save();

    res.status(201).json(orden);

}

/* const actualizarCategoria = async (req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

    res.json(categoria);

}

const borrarCategoria = async (req, res = response) => {

    const { id } = req.params;
    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json(categoriaBorrada);
} */


module.exports = {
    crearOrden,
    obtenerOrdenes,
    //obtenerCategoria,
    //actualizarCategoria,
    //borrarCategoria
}