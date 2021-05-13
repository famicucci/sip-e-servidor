const express = require('express');
const router = express.Router();

const middlewares = require('./middlewares');
const apiProductosRouter = require('./api/productos');
const apiEmpresasRouter = require('./api/empresas');
const apiUsuariosRouter = require('./api/usuarios');
const apiStockproductosRouter = require('./api/stockproductos');

router.use('/usuarios', apiUsuariosRouter);
router.use('/empresas', middlewares.checkToken, apiEmpresasRouter);

router.use('/productos', middlewares.checkToken, apiProductosRouter);
router.use('/stockproductos', middlewares.checkToken, apiStockproductosRouter);

module.exports = router;
