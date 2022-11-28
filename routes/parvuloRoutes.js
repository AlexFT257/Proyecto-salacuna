const express = require('express');
const parvuloController = require('../controllers/parvuloController');
const api = express.Router();

api.post('/parvulo/create/:rutUser',parvuloController.createParvulo);
api.get('/parvulos/listar/:rutUser',parvuloController.getParvulos);
api.put('/parvulo/update/:rutUser/:rutPar',parvuloController.updateParvulo);
api.delete('/parvulo/delete/:rutUser/:rutPar',parvuloController.deleteParvulo);
api.get('/parvulo/search/:rutUser/:rutPar',parvuloController.getOneParvulo);
module.exports=api;
