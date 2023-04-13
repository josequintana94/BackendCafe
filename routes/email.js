const { Router } = require('express');
const { check } = require('express-validator');
const { verifyEmail, verifyRecoveryCode, updatePassword } = require('../controllers/email');
const { validarCampos } = require('../middlewares');

const router = Router();

router.post('/verify_email', [check('email', 'El email es obligatorio').not().isEmpty(),validarCampos], verifyEmail);
router.post('/verify_code', [check('code', 'El código es obligatorio').not().isEmpty(),verifyRecoveryCode], );
router.post('/update_password', [check('changePasswordTken', 'El token es obligatorio').not().isEmpty(),], updatePassword);

module.exports = router;