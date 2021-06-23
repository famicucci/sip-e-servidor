const express = require('express');
const router = express.Router();

const middlewares = require('./middlewares');
const apiUsuariosRouter = require('./api/usuarios');
const apiEmpresasRouter = require('./api/empresas');
const apiProductosRouter = require('./api/productos');
const apiStockproductosRouter = require('./api/stock');
const apiPreciosRouter = require('./api/precios');
const apiVentasRouter = require('./api/ventas');
const apiPagosRouter = require('./api/pagos');

router.use('/usuarios', apiUsuariosRouter);
router.use('/empresas', middlewares.checkToken, apiEmpresasRouter);
router.use('/productos', middlewares.checkToken, apiProductosRouter);
router.use('/stock', middlewares.checkToken, apiStockproductosRouter);
router.use('/precios', middlewares.checkToken, apiPreciosRouter);
router.use('/ventas', middlewares.checkToken, apiVentasRouter);

// pagos
router.use('/pagos', middlewares.checkToken, apiPagosRouter);

module.exports = router;
