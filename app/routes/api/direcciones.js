const express = require('express');
const router = express.Router();
const DireccionController = require('../../controllers/DireccionController');

router.post('/', DireccionController.crearDireccion);

module.exports = router;
