const express = require('express');
const router = express.Router();
const StockController = require('../../controllers/StockController');

router.put('/', StockController.modificarStock);
router.get('/total', StockController.traerStockTotal);
router.get('/pto-stock', StockController.traerStockPtoStock);
router.get('/producto/:codigo', StockController.traerStockProducto);
router.get('/movimientos', StockController.traerMovimientos);

module.exports = router;
