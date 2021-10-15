const express = require('express');
const router = express.Router();
const TiendaNubeController = require('../../controllers/TiendaNubeController');

router.get('/productos', TiendaNubeController.traerProductos);

module.exports = router;
