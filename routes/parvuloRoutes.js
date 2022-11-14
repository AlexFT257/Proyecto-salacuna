const express = require('express');
const parvuloController = require('../controllers/parvuloController');
const api = express.Router();
api.post('/parvulo',parvuloController.createParvulo);
api.get('/parvulos',parvuloController.getParvulos);
api.put('/parvulo/update/:rut',parvuloController.updateParvulo);
api.delete('/parvulo/delete/:rut',parvuloController.deleteParvulo);
api.get('/parvulo/search/:rut',parvuloController.getOneParvulo);
module.exports=api;
