const express = require('express');
const router = express.Router();
const StockController = require('../../controllers/StockController');

// router.post('/', StockController.crearStock);
router.put('/:ProductoCodigo/:PtoStockId', StockController.modificarStock);

module.exports = router;
