const express = require('express');
const router = express.Router();
const StockController = require('../../controllers/StockController');

router.put('/', StockController.modificarStock);
router.get('/total', StockController.traerStockTotal);
router.get('/producto', StockController.traerStockProducto);
router.get('/movimientos', StockController.traerMovimientos);

module.exports = router;
