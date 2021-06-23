const express = require('express');
const router = express.Router();
const GastoController = require('../../controllers/GastoController');

router.get('/categorias', GastoController.traerCatSubcat);
router.post('/', GastoController.crearGasto);
router.get('/', GastoController.traerGastos);
router.put('/:Id', GastoController.modificarGasto);
router.delete('/:Id', GastoController.eliminarGasto);

module.exports = router;
