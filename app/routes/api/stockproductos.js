const express = require('express');
const router = express.Router();
const StockController = require('../../controllers/StockController');

router.post('/', StockController.crearStockProducto);

module.exports = router;
