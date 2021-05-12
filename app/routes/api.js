const express = require('express');
const router = express.Router();

const apiProductosRouter = require('./api/productos');
const apiEmpresasRouter = require('./api/empresas');
const apiUsuariosRouter = require('./api/usuarios');

router.use('/productos', apiProductosRouter);
router.use('/empresas', apiEmpresasRouter);
router.use('/usuarios', apiUsuariosRouter);

module.exports = router;
