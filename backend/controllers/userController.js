const User = require("../models/user");
const { createToken } = require("../services/token");

const createUser = (req, res) => {
  const {
    nombre,
    apellido,
    rut,
    mail,
    role,
    foto,
    fechaNa,
    domicilio,
    telefono,
  } = req.body;
  const newUser = new User({
    nombre,
    apellido,
    rut,
    mail,
    role,
    foto,
    fechaNa,
    domicilio,
    telefono,
  });
  newUser.save((err, user) => {
    if (err) {
      return res.status(400).send({ message: "Error al crear el usuario" });
    }
    return res.status(201).send(user);
  });
};

const getUsers = (req, res) => {
  User.find({}, (err, user) => {
    if (err) {
      return res.status(400).send({ message: "Error al obtener los usuarios" });
    }
    return res.status(200).send(user);
  });
};

// funciones de autentificacion de usuario

const login = (req, res) => {
  const id  = req.headers['x-caller-id'];
  console.log(id);
  User.findById(id, (err, user) => {
    if (err) {
      return res.status(500).send({ message: err });
    }
    if (!user) {
      return res.status(404).send({ message: "No existe el usuario" });
    }
    res.cookie("token", createToken(user), { httpOnly: true });
    return res
      .status(200)
      .send({
        message: "Inicio sesion correctamente",
        token: createToken(user),
        user: user.nombre,
      });
  });
};

const logout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).send({ message: "Sesion cerrada" });
};

const checkToken = (req, res) => {
  return res.status(200).send({ message: "Token valido" });
};

module.exports = {
  createUser,
  getUsers,
  login,
  checkToken,
  logout,
};
