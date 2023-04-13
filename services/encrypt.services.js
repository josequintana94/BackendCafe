const Crypto = require('crypto-js');
const { aesIv, aesSecret } = require('../config/config');

// encrypt
const encrypt = (text) => {
  const key = Crypto.enc.Utf8.parse(aesSecret);
  const iv = Crypto.enc.Utf8.parse(aesIv);

  const encrypted = Crypto.AES.encrypt(text, key, {
    iv,
    mode: Crypto.mode.CBC,
    padding: Crypto.pad.Pkcs7,
  })
  return encrypted.toString().replace(/\+/g, 'xMl3Jk').replace(/\//g, 'Por21Ld').replace(/=/g, 'Ml32');
}

// decrypt
const decrypt = (text) => {
  const textDecrypt = text
    .toString()
    .replace(/xMl3Jk/g, '+')
    .replace(/Por21Ld/g, '/')
    .replace(/Ml32/g, '=');

  const key = Crypto.enc.Utf8.parse(aesSecret);
  const iv = Crypto.enc.Utf8.parse(aesIv);

  const cipher = Crypto.AES.decrypt(textDecrypt, key, {
    iv,
    mode: Crypto.mode.CBC,
    padding: Crypto.pad.Pkcs7,
  })
  return cipher.toString(Crypto.enc.Utf8);
}

module.exports = {
  encrypt,
  decrypt
}