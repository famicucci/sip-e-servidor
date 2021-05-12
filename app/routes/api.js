const express = require('express');
const router = express.Router();

const middlewares = require('./middlewares');
const apiProductosRouter = require('./api/productos');
const apiEmpresasRouter = require('./api/empresas');
const apiUsuariosRouter = require('./api/usuarios');

router.use('/productos', middlewares.checkToken, apiProductosRouter);
router.use('/empresas', middlewares.checkToken, apiEmpresasRouter);
router.use('/usuarios', apiUsuariosRouter);

module.exports = router;
