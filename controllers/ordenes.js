const { response } = require('express');
const { Orden, Usuario } = require('../models');
const { sendEmail } = require('../services/email.services');
const { CourierClient } = require("@trycourier/courier");


const obtenerOrdenes = async (req, res = response) => {
  const { limite = 500, desde = 0 } = req.query;
  const query = { activo: true };

  const [total, ordenes] = await Promise.all([
    Orden.countDocuments(query),
    Orden.find(query)
      .populate('idOrden', 'total')
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);

  res.json({
    total,
    ordenes,
  });
};

const obtenerOrdenesPorUsuario = async (req, res = response) => {
  const { limite = 500, desde = 0 } = req.query;
  const { idUsuario } = req.body;

  const query = { usuarioVendedor: idUsuario };
  const countDocumentsQuery = { activo: true };

  console.log('iduser ' + idUsuario);
  const [total, ordenes] = await Promise.all([
    Orden.countDocuments(countDocumentsQuery),
    Orden.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    ordenes,
  });
};

const obtenerOrden = async (req, res = response) => {
  const { id } = req.params;
  const categoria = await Orden.findById(id).populate('productos');

  res.json(categoria);
};

const crearOrden = async (req, res = response) => {
  // Generar la data a guardar
  const body = req.body;
  const sellerUserId = body.usuarioVendedor;

  const sellerUser = Usuario.findById(sellerUserId);
  const sellerUserPushToken = sellerUser.pushToken;

  const courier = CourierClient({ authorizationToken: "pk_prod_JZG88M0TQ0MZVYN91YHSKKD2SQBT" });

  console.log('user ' + sellerUser);
  console.log('sellerUserPushToken ' + sellerUserPushToken);
  console.log('sellerUserId ' + sellerUserId);
  
  const { requestId } = await courier.send({
    message: {
      to: {
        expo: {
          token: 'ExponentPushToken[FAPkYBHwthFnylJzfFvufC]',
        },
      },
      template: "32JRQY1RYNMKYYK5E0J0Y448Y6KC",
      data: {
      },
    },
  });

  const orden = new Orden(body);

  console.log('orden a crear ' + orden);
  // Guardar DB
  //save order with unique id
  await orden.save();

  res.status(201).json(orden);
};

const enviarFactura = async (req, res = response) => {
  const { id, email } = req.body;

  try {
    const orden = await Orden.findById(id);

    console.log('orden', orden);
    console.log('req', req.body);

    const mailOptions = {
      subject: `Ticket de la orden n°:${orden._id}`,
      html: `<h1>Ticket</h1>
                <hr>
                <div>
                ${orden.productos.map((producto) => {
        return `<div style='display: flex; align-items: center; gap: 20px'>
                            <p>Producto: ${producto.nombre}</p>
                            <p>Cantidad: ${producto.cantidad}</p>
                            <pre>Precio: $${producto.precio}</pre>
                            <pre>Subtotal: $${producto.subtotal}</pre>
                            <hr>`;
      })}
                </div>
                <hr>
                <p>Total: <b><pre>${orden.total}</pre></b></p>
            `,
    };

    await sendEmail(email, mailOptions);

    res.status(200).json('Orden enviada correctamente');
  } catch (error) {
    console.warn('Hubo un error en enviarFactura', error);

    res.status(500).json('Hubo un error');
  }
};

module.exports = {
  crearOrden,
  obtenerOrdenes,
  obtenerOrden,
  obtenerOrdenesPorUsuario,
  enviarFactura,
};
