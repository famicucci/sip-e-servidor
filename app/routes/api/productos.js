const express = require('express');
const router = express.Router();
const ProductoController = require('../../controllers/ProductoController');

router.get('/', ProductoController.traerProductos);
router.post('/', ProductoController.crearProducto);
router.put('/:ProductoCodigo', ProductoController.modificarProducto);
router.delete('/:ProductoCodigo', ProductoController.eliminarProducto);

module.exports = router;
