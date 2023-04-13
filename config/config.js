const config = {
  nodemailer: {
    email: process.env.NODEMAILER_EMAIL,
    password: process.env.NODEMAILER_PASSWORD,
    service: process.env.NODEMAILER_SERVICE,
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
  },
  crypto: {
    aesIv: process.env.AES_IV,
    aesSecret: process.env.AES_SECRET,
  }
};
module.exports = config;