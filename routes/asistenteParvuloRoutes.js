const express = require('express');
const asistenteParvuloController = require('../controllers/asistenteParvuloController');
const api = express.Router();

api.get('/asistentes',userController.getAsistentes);
api.get('/asistente/search/:rut',userController.getAsistente);
api.get('/asistente/search',userController.getSelectionAsistentes);
api.put('/asistente/update/:rut',userController.updateAsistente);
api.delete('/asistente/delete/:rut',userController.deleteAsistente);
api.delete('/asistente/delete',userController.deleteSelectionAsistentes);


module.exports=api;