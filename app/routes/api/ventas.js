const express = require('express');
const router = express.Router();
const VentasController = require('../../controllers/VentasController');

router.get('/total', VentasController.traerStockTotal);
router.get('/pto-stock', VentasController.traerStockPtoStock);

module.exports = router;
