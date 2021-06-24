const express = require('express');
const router = express.Router();
const FacturaController = require('../../controllers/FacturaController');

router.get('/', FacturaController.traerFacturasOrdenesEnProceso);
router.get('/superadas', FacturaController.traerFacturasOrdenesSuperadas);
router.post('/', FacturaController.crearFactura);
router.put('/:Id', FacturaController.modificarFactura);

module.exports = router;
