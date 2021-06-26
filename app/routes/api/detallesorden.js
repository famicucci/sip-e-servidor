const express = require('express');
const router = express.Router();
const OrdenDetalleController = require('../../controllers/OrdenDetalleController');

router.post('/', OrdenDetalleController.crearDetalleOrden);

module.exports = router;
