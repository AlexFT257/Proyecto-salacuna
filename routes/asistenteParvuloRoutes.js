const express = require('express');
const asistenteParvuloController = require('../controllers/asistenteParvuloController');
const api = express.Router();

api.post('/asistenteParvulo',asistenteParvuloController.createAsistente);
api.get('/asistentesParvulo',asistenteParvuloController.getAsistentes);
api.put('/asistentesParvulo/update/:rut',asistenteParvuloController.updateAsistente);
api.delete('/asistenteParvulo/delete/:rut',asistenteParvuloController.deleteAsistente);
api.get('/asistenteParvulo/search/:rut',asistenteParvuloController.getAsistente);

module.exports=api;