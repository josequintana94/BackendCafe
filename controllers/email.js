const { response } = require('express');
const { findUserByEmail } = require('../services/email.services');
const { uuid } = require('uuidv4');
const { sendEmail } = require( '../services/email.services');


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

module.exports = {
  verifyEmail
}