const { response } = require('express');
const { findUserByEmail } = require('../services/email.services');
const { uuid } = require('uuidv4');
const { sendEmail } = require( '../services/email.services');
const { findUserByCode, findUserByToken } = require('../services/email.services');
const { getDiffHours } = require('../helpers/validateCode');
//const { encrypt , decrypt } = require('../services/encrypt.services');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

// verify email
const verifyEmail = async (req, res = response) => {
  try {

    const { email } = req.body;

    // find user
    const user = await findUserByEmail(email);
    if (!user) return res.status(404).send({
      success: false,
      message: 'Email not found'
    })

    // generate token
    const tokenUuid = uuid();
    user.recoveryPassword = {
      token: tokenUuid,
      date: new Date(),
      tokenNumber:  `${Math.floor(Math.random() * 1000000000)}`,
      tokenUpdatePassword : uuid()
    }

    // update user
    await user.save();

    // send email
    const resultSendEmail = await sendEmail(tokenUuid, email);

    res.status(200).send({
      success: resultSendEmail.accepted.length > 0,
      message: 'Correct process'
    })
  } catch (error) {
    console.log("🚀 ~ file: email.js:35 ~ verifyEmail ~ error:", error)
    res.status(500).send({
      success: false,
      message: error.message
    })
  }
}

const verifyRecoveryCode = async (req, res = response) => {
  try {
    const { code } = req.body;
    const user = await findUserByCode(code);
    if (!user) return res.status(404).send({
      success: false,
      message: 'Code not found'
    })

    // get difference hours
    const diffHours = getDiffHours(new Date(), user.recoveryPassword.date);
    if (diffHours > 1) return res.status(401).send({
      success: false,
      message: 'Unauthorized'
    })

    //const userEncrypted = encrypt(user.recoveryPassword.tokenNumber);
    
    res.status(200).send({
      message: 'ok',
      changePasswordToken: user.recoveryPassword.tokenUpdatePassword
    })
  } catch (error) {
    console.log("🚀 ~ file: email.js:50 ~ verifyRecoveryCode ~ error:", error)
  }
}

const updatePassword = async (req, res = response) => {
  try {
    const { changePasswordToken, email, newPassword } = req.body;
    if(!changePasswordToken || !email || !newPassword) return res.status(400).send({
      success: false,
      message: 'Bad request'
    })
    
    const user = await findUserByToken(changePasswordToken);
    if (!user) return res.status(404).send({
      success: false,
      message: 'Code not found'
    })
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    const newPasswordUpdated  = bcryptjs.hashSync( newPassword, salt );

    await Usuario.findByIdAndUpdate( user.id, { password: newPasswordUpdated} );

    return res.status(200).send({
      message: 'ok'
    })
  }
  catch (error) {
    console.log("🚀 ~ file: email.js:50 ~ verifyRecoveryCode ~ error:", error)
  }
}    

module.exports = {
  verifyEmail,
  verifyRecoveryCode,
  updatePassword
}