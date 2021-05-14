const express = require('express');
const router = express.Router();
const PrecioController = require('../../controllers/PrecioController');

router.post('/', PrecioController.crearPrecio);
router.put('/', PrecioController.modificarPrecio);
router.get('/', PrecioController.traerPrecios);

module.exports = router;
