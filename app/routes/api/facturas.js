const express = require('express');
const router = express.Router();
const FacturaController = require('../../controllers/FacturaController');

router.get('/', FacturaController.traerFacturas);
router.get('/cliente/:Id', FacturaController.traerFacturasCliente);
router.post('/', FacturaController.crearFactura);
router.put('/:Id', FacturaController.modificarFactura);
router.get('/:Id', FacturaController.traerFactura);

module.exports = router;
