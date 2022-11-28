const express = require('express');
const asistenteParvuloController = require('../controllers/asistenteParvuloController');
const api = express.Router();

api.get('/asistentes',asistenteParvuloController.getAsistentes);
api.get('/asistente/search/:rut',asistenteParvuloController.getAsistente);
api.get('/asistente/search',asistenteParvuloController.getSelectionAsistentes);
api.put('/asistente/update/:rut',asistenteParvuloController.updateAsistente);
api.delete('/asistente/delete/:rut',asistenteParvuloController.deleteAsistente);
api.delete('/asistente/delete',asistenteParvuloController.deleteSelectionAsistentes);


module.exports=api;