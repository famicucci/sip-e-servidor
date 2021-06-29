const express = require('express');
const router = express.Router();
const FacturaController = require('../../controllers/FacturaController');

router.get('/', FacturaController.traerFacturas);
router.post('/', FacturaController.crearFactura);
router.put('/:Id', FacturaController.modificarFactura);
router.get('/:Id', FacturaController.traerFactura);

module.exports = router;
