const express = require('express');
const router = express.Router();
const OrdenController = require('../../controllers/OrdenController');

router.get('/', OrdenController.traerOrdenes);
router.post('/', OrdenController.crearOrden);
router.put('/:Id', OrdenController.modificarOrden);

module.exports = router;
