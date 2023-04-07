const Usuario = require('../models/usuario');
const nodemailer = require('nodemailer');
const config = require('../config/config');

// find user by email
const findUserByEmail = async (email) => {
  const user = await Usuario.findOne({ correo: email });
  return user;
}

// send email
const sendEmail = async (token, email) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.nodemailer.email,
        pass: config.nodemailer.password,
      }
  });
  const mailOptions = {
    from: config.nodemailer.email,
    to: email,
    subject: 'Recuperar contraseña',
    html: `<h1>Recuperar contraseña</h1> 
    <hr>
    <p>Tu token de seguridad es el siguiente <b>${token}</b></p>
    <p>¡No lo compartas con nadie!</p>
      `,
  };
  const result = await transporter.sendMail(mailOptions);
  return result;
};


module.exports = {
  findUserByEmail,
  sendEmail
};