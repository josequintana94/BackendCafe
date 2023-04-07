const { Router } = require('express');
const { check } = require('express-validator');
const { verifyEmail } = require('../controllers/email');
const { validarCampos } = require('../middlewares');

const router = Router();

router.post('/verify_email', [check('email', 'El email es obligatorio').not().isEmpty(),validarCampos], verifyEmail);

module.exports = router;