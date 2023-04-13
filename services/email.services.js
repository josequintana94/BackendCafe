const Usuario = require('../models/usuario');
const nodemailer = require('nodemailer');
const config = require('../config/config');

// find user by email
const findUserByEmail = async (email) => {
  const user = await Usuario.findOne({ correo: email });
  return user;
};

// send email
const sendEmail = async (email, options) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.nodemailer.email,
      pass: config.nodemailer.password,
    },
  });
  const mailOptions = {
    from: config.nodemailer.email,
    to: email,
    ...options
  };
  const result = await transporter.sendMail(mailOptions);
  return result;
};

// buscar en la base con el code
const findUserByCode = async (code) => {
  const user = await Usuario.findOne({ 'recoveryPassword.token': code });
  return user;
};

// buscar el usuario de la base por el token de seguridad
const findUserByToken = async (token) => {
  const user = await Usuario.findOne({
    'recoveryPassword.tokenUpdatePassword': token,
  });
  return user;
};

module.exports = {
  findUserByEmail,
  sendEmail,
  findUserByCode,
  findUserByToken,
};
