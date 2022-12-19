const express = require('express');
const api = express.Router();
const userController = require('../controllers/userController');
const auth = require("../middlewares/auth");
api.post('/user',userController.createUser);
api.get('/users',userController.getUsers);
// rutas de autentificacion de usuario
//api.post("/login", userController.login);
//api.get("/checkToken", auth.auth, userController.checkToken);
//api.get("/logout", auth.auth, userController.logout);

module.exports = api;

