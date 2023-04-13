const { mongoose } = require('mongoose');
const { response } = require('express');
const { Orden } = require('../models');

const obtenerOrdenes = async (req, res = response) => {

    const { limite = 500, desde = 0 } = req.query;
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

const obtenerOrdenesPorUsuario = async(req, res = response ) => {

    const { limite = 500, desde = 0 } = req.query;
    const { idUsuario } = req.body;

    const query = { 'usuarioVendedor': idUsuario};
    const countDocumentsQuery = { activo: true };
    
    console.log("iduser " + idUsuario);
    const [ total, ordenes ] = await Promise.all([
        Orden.countDocuments(countDocumentsQuery),
        Orden.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        ordenes
    });
}

const obtenerOrden = async (req, res = response) => {

    const { id } = req.params;
    const categoria = await Orden.findById(id)
        .populate('productos');

    res.json(categoria);
}

const crearOrden = async (req, res = response) => {

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
    obtenerOrden,
    obtenerOrdenesPorUsuario
}