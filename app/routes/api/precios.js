const express = require('express');
const router = express.Router();
const PrecioController = require('../../controllers/PrecioController');

router.post('/', PrecioController.crearPrecio);

module.exports = router;
