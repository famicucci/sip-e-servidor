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
const apiGastosRouter = require('./api/gastos');
const apiTiposenvioRouter = require('./api/tiposenvio');
const apiClientesRouter = require('./api/clientes');
const apiFacturasRouter = require('./api/facturas');

router.use('/usuarios', apiUsuariosRouter);
router.use('/empresas', middlewares.checkToken, apiEmpresasRouter);
router.use('/productos', middlewares.checkToken, apiProductosRouter);
router.use('/stock', middlewares.checkToken, apiStockproductosRouter);
router.use('/precios', middlewares.checkToken, apiPreciosRouter);
router.use('/ventas', middlewares.checkToken, apiVentasRouter);
router.use('/pagos', middlewares.checkToken, apiPagosRouter);
router.use('/gastos', middlewares.checkToken, apiGastosRouter);
router.use('/tipos-envio', middlewares.checkToken, apiTiposenvioRouter);
router.use('/clientes', middlewares.checkToken, apiClientesRouter);
router.use('/facturas', middlewares.checkToken, apiFacturasRouter);

module.exports = router;
