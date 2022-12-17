const express = require('express');
const actividadController = require('../controllers/actividadController');
const api = express.Router();
const parvulariaAuth = require('../middlewares/parvulariaAuth');
const apoderadoAuth  = require('../middlewares/apoderadoAuth');

api.post('/actividad', parvulariaAuth, actividadController.createActividad);
api.get('/actividades',actividadController.getActividades);
api.put('/actividad/update/:id', parvulariaAuth, actividadController.updateActividad);
api.delete('/actividad/delete/:id', parvulariaAuth, actividadController.deleteActividad);
api.get('/actividad/search/:id', actividadController.getActividad);
api.get('/actividad/parvulo/:id', actividadController.getActividadesByParvulo);

module.exports=api;