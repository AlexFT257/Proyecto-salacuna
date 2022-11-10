const express = require('express');
const asistenteParvuloController = require('../controllers/asistenteParvuloController');
const api = express.Router();

api.post('/asistenteParvulo',asistenteParvuloController.createAsistente);


module.exports=api;