const express = require('express');
const router = express.Router();
const OrdenController = require('../../controllers/OrdenController');

router.get('/', OrdenController.traerOrdenes);
router.post('/', OrdenController.crearOrden);

module.exports = router;
