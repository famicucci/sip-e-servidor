const express = require('express');
const router = express.Router();
const StockController = require('../../controllers/StockController');

router.put('/', StockController.modificarStock);

module.exports = router;
