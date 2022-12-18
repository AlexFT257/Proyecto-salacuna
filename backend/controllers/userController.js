const File = require("../models/file");
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
  const { rut } = req.body;
  console.log(rut + " inicio sesion");
  if (!rut || rut === "null") {
    return res.status(400).send({ message: "No se envio el id o es indefinido" });
  }
  User.findOne({rut:rut}, (err, user) => {
    if (err) {
      return res.status(500).send({ message: err });
    }
    if (!user) {
      return res.status(404).send({ message: "No existe el usuario" });
    }
    console.log(user);
    const token = createToken(user);
    res.cookie("token", token, { httpOnly: true });
    return res
      .status(200)
      .send({
        message: "Inicio sesion correctamente",
        token: token,
        user: user.nombre,
      });
  });
};

const logout = (req, res) => {
  console.log(req.user + " cerro sesion");
  res.clearCookie("token");
  return res.status(200).send({ message: "Sesion cerrada" });
};

const checkToken = (req, res) => {
  return res.status(200).send({ message: "Token valido" });
};

const getUserFoto = (req, res) => {
  const id  = req.get("X-Caller-Id");
  User.findById(id, (err, user) => {
    if (err) {
      return res.status(400).send({ message: "Error al obtener el usuario" });
    }
    if (!user) {
      return res
        .status(400)
        .send({ message: "Error al obtener el usuario (usuario no existe)" });
    }
    File.findById(user.foto, (err, file) => {
      if (err) {
        return res.status(400).send({ message: "Error al obtener la foto" });
      }
      if (!file) {
        return res
          .status(400)
          .send({ message: "Error al obtener la foto (foto no existe)" });
      }
      
      return res.status(200).send({name:user.nombre, apellido:user.apellido, foto:file._id});
    });
  });
};


module.exports = {
  createUser,
  getUsers,
  login,
  checkToken,
  logout,
  getUserFoto,
};
