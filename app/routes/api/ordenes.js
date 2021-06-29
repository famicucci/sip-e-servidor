const express = require('express');
const router = express.Router();
const OrdenController = require('../../controllers/OrdenController');

router.get('/', OrdenController.traerOrdenes);
router.post('/', OrdenController.crearOrden);
router.put('/:Id', OrdenController.modificarOrden);
router.delete('/:Id', OrdenController.eliminarOrden);

module.exports = router;
