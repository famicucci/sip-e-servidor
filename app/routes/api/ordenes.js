const express = require('express');
const router = express.Router();
const OrdenController = require('../../controllers/OrdenController');

router.get('/', OrdenController.traerOrdenes);

module.exports = router;
