const express = require('express');
const router = express.Router();
const StockController = require('../../controllers/StockController');

router.put('/', StockController.modificarStock);
router.get('/pto-stock', StockController.traerStockPtoStock);

module.exports = router;
