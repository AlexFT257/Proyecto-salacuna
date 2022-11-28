const express = require('express');
const asistenciaController = require('../controllers/asistenciaController.js');
const retiroController = require('../controllers/retiroController.js');
const api = express.Router();


api.post('/asistencia/registrar/:id', asistenciaController.registrarAsistencia);
api.put('/asistencia/actualizar/:id', asistenciaController.actualizarAsistencia);
api.delete('/asistencia/eliminar/:id', asistenciaController.eliminarAsistencia);
api.get('/asistencia/obtener', asistenciaController.obtenerAsistencia);

api.post('/asistencia/notificar_retiro', retiroController.notificarRetiro);

module.exports = api;
