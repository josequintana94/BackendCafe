const { mongoose } = require('mongoose');
const { response } = require('express');
const { Orden } = require('../models');
//deploy
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

const obtenerOrden = async (req, res = response) => {

    const { id } = req.params;
    const categoria = await Orden.findById(id)
        .populate('idOrden', 'total');

    res.json(categoria);
}

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
    const body = req.body;
    const orden = new Orden(body);

    console.log('orden a crear ' + orden);
    // Guardar DB
    //save order with unique id
    await orden.save();

    res.status(201).json(orden);

}

module.exports = {
    crearOrden,
    obtenerOrdenes,
    obtenerOrden
}