const express = require('express');
const router = express.Router();
const TiendaNubeController = require('../../controllers/TiendaNubeController');

router.get('/productos', TiendaNubeController.traerProductos);
router.put('/stock/:ProductId/:VariantId', TiendaNubeController.modificarStock);
router.get('/ordenes/', TiendaNubeController.traerOrdenes);
router.post('/ordenes/:Id/close', TiendaNubeController.cancelOrder);

module.exports = router;
