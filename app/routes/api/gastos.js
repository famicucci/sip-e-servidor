const express = require('express');
const router = express.Router();
const GastoController = require('../../controllers/GastoController');

router.get('/categorias', GastoController.traerCatSubcat);
router.post('/', GastoController.crearGasto);

module.exports = router;
