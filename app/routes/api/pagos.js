const express = require('express');
const router = express.Router();
const PagoController = require('../../controllers/PagoController');

router.post('/', PagoController.crearPago);

module.exports = router;
