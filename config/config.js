const config = {
  isProduction: process.env.NODE_ENV === 'production',
  port: process.env.PORT,
  cloudinary: {
    url: process.env.CLOUDINARY_URL,
  },
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