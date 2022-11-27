const User = require("../models/user");

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

module.exports = {
  createUser,
  getUsers,
};
