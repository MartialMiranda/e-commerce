const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuarioController');

router.get('/obtenerUsuarios', controller.obtenerUsuarios);
router.post('/GuardarUsuario', controller.GuardarUsuario);
router.post('/EliminarUsuario', controller.EliminarUsuario);

module.exports = router;