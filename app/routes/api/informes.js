const express = require('express');
const router = express.Router();
const InformesController = require('../../controllers/InformesController');

router.get('/ingresos-brutos', InformesController.traerIngresosBrutos);
router.get('/gastos', InformesController.traerGastos);

module.exports = router;
