const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT } = require('../middlewares');

const { crearOrden,
    obtenerOrdenes,
    obtenerOrden,
} = require('../controllers/ordenes');

//const { existeCategoriaPorId } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/ordenes
 */

//  Obtener todas las categorias - publico
router.get('/', obtenerOrdenes);

// Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
], obtenerOrden);

// Crear categoria - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT,
    check('total', 'El total es obligatorio').not().isEmpty(),
], crearOrden);

module.exports = router;