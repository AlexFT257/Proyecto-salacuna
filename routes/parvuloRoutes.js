const express = require('express');
const parvuloController = require('../controllers/parvuloController');
const api = express.Router();
api.post('/parvulo',parvuloController.createParvulo);
module.exports=api;
