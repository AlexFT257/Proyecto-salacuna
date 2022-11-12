const express = require('express');
const parvuloController = require('../controllers/parvuloController');
const api = express.Router();
api.post('/parvulo',parvuloController.createParvulo);
api.get('/parvulos',parvuloController.getParvulos);
api.put('/parvulo/:id',parvuloController.updateParvulo);
module.exports=api;
