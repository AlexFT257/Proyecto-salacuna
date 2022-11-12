const express = require('express');
const actividadController = require('../controllers/actividadController');
const api = express.Router();

api.post('/actividad',actividadController.createActividad);
api.get('/actividades',actividadController.getActividades);
api.put('/actividad/update/:id',actividadController.updateActividad);
api.delete('/actividad/delete/:id',actividadController.deleteActividad);
api.get('/actividad/search/:id',actividadController.getActividad);

module.exports=api;