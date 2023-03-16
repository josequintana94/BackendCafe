const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT } = require('../middlewares');

const { crearOrden,
    obtenerOrdenes
} = require('../controllers/ordenes');

//const { existeCategoriaPorId } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/ordenes
 */

//  Obtener todas las categorias - publico
router.get('/', obtenerOrdenes);

// Crear categoria - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT,
    check('total', 'El total es obligatorio').not().isEmpty(),
], crearOrden);

module.exports = router;