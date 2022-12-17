const express = require('express');
const asistenciaController = require('../controllers/asistenciaController.js');
const retiroController = require('../controllers/retiroController.js');
const api = express.Router();
const parvulariaAuth = require('../middlewares/parvulariaAuth');

api.post('/asistencia/registrar/:id',parvulariaAuth,  asistenciaController.registrarAsistencia);
api.put('/asistencia/actualizar/:id', asistenciaController.actualizarAsistencia);
api.delete('/asistencia/eliminar/:id', asistenciaController.eliminarAsistencia);
api.get('/asistencia/obtener', asistenciaController.obtenerAsistencia);

api.post('/asistencia/notificar_retiro',parvulariaAuth, retiroController.notificarRetiro);

module.exports = api;
