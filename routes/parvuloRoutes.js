const express = require('express');
const parvuloController = require('../controllers/parvuloController');
const api = express.Router();
const parvulariaAuth = require('../middlewares/parvulariaAuth');

api.post('/parvulo',parvulariaAuth,parvuloController.createParvulo);
api.get('/parvulos',parvulariaAuth,parvuloController.getParvulos);
api.put('/parvulo/update/:rut',parvulariaAuth,parvuloController.updateParvulo);
api.delete('/parvulo/delete/:rut',parvulariaAuth,parvuloController.deleteParvulo);
api.get('/parvulo/search/:rut',parvulariaAuth,parvuloController.getOneParvulo);



module.exports=api;
