const express = require('express');
const asistenteParvuloController = require('../controllers/asistenteParvuloController');
const api = express.Router();

const asistenteAuth = require('../middlewares/parvulariaAuth');

api.post('/asistente',asistenteAuth,asistenteParvuloController.createAsistente);
api.get('/asistentes', asistenteParvuloController.getAsistentes);
api.get('/asistente/search/:rut',asistenteAuth,asistenteParvuloController.getAsistente);
api.get('/asistente/search',asistenteAuth,asistenteParvuloController.getSelectionAsistentes);
api.put('/asistente/update/:rut',asistenteAuth,asistenteParvuloController.updateAsistente);
api.delete('/asistente/delete/:rut',asistenteAuth,asistenteParvuloController.deleteAsistente);
api.delete('/asistente/delete',asistenteAuth,asistenteParvuloController.deleteSelectionAsistentes);


module.exports=api;