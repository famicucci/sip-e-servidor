const express = require('express');
const router = express.Router();
const FacturaController = require('../../controllers/FacturaController');

router.get('/', FacturaController.traerFacturas);
router.post('/', FacturaController.crearFactura);
router.put('/:Id', FacturaController.modificarFactura);

module.exports = router;
