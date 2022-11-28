const User = require('../models/user');

const createAsistente = (req, res) => {
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
  // obligando el rol de asistente
  newUser.role='asistente';
  newUser.save((err, user) => {
    if (err) {
      return res.status(400).send({ message: "Error al crear el usuario" });
    }
    return res.status(201).send(user);
  });
};

const getAsistentes = (req, res) => {
  AsistenteParvulo.find({})
    .populate()
    .exec((error, asistentes) => {
      if (error) {
        return res
          .status(400)
          .send({ message: "No se pudo realizar la busqueda" });
      }
      if (asistentes.length === 0) {
        return res
          .status(404)
          .send({ message: "No se encontraron asistentes" });
      }
      return res.status(200).send(asistentes);
    });
};

const getAsistente = (req, res) => {
  const { rut } = req.params;
  User.findOne({ rut: rut }, (err, user) => {
    if (err) {
      return res.status(400).send({ message: "Error al obtener el usuario" });
    }
    if (!user) {
      return res
        .status(400)
        .send({ message: "Error al obtener el usuario (usuario no existe)" });
    }
    if (user.role != "asistente") {
      return res
        .status(400)
        .send({ message: "Error, el usuario no es asistente de parvulo" });
    }
    return res.status(200).send(user);
  });
};

const updateAsistente = (req, res) => {
  const { rut } = req.params;
  User.findOneAndUpdate(rut, req.body, (err, user) => {
    if (err) {
      return res.status(400).send({ message: "Error al obtener el usuario" });
    }
    if (!user) {
      return res.status(400).send({ message: "Error al obtener el usuario (usuario vacio)" });
    }
    if (user.role != "asistente") {
      return res
        .status(400)
        .send({ message: "Error, el usuario no es asistente de parvulo" });
    }
    return res
      .status(200)
      .send({ message: "Asistente modificado correctamente" });
  });
};

const getSelectionAsistentes = (req, res) => {
  const { ruts } = req.body;
  User.find({ rut: ruts }, (err, users) => {
    if (err) {
      return res.status(400).send({ message: "Error al obtener el usuario" });
    }
    if (!users) {
      return res.status(400).send({ message: "Error al obtener el usuario" });
    }
    users.forEach((user) => {
      if (user.role != "asistente") {
        return res
          .status(400)
          .send({ message: "Error, el usuario no es asistente de parvulo" });
      }
    });
    return res.status(200).send(users);
  });
};

const deleteAsistente = (req, res) => {
  const { rut } = req.params;
  User.findOneAndDelete(rut, (err, user) => {
    if (err) {
      return res.status(400).send({ message: "Error al obtener el usuario" });
    }
    if (!user) {
      return res.status(400).send({ message: "Error al obtener el usuario" });
    }
    if (user.role != "asistente") {
      return res
        .status(400)
        .send({ message: "Error, el usuario no es asistente de parvulo" });
    }
    return res
      .status(200)
      .send({ message: "Asistente eliminado correctamente" });
  });
};

const deleteSelectionAsistentes = (req, res) => {
  const { ruts } = req.body;
  User.deleteMany({ rut: ruts }, (err, users) => {
    if (err) {
      return res.status(400).send({ message: "Error al obtener el usuario" });
    }
    if (!users) {
      return res.status(400).send({ message: "Error al obtener el usuario" });
    }
    for (let index = 0; index < users.length; index++) {
      const user = users[index];
      if (user.role != "asistente") {
        return res
          .status(400)
          .send({ message: "Error, el usuario no es asistente de parvulo" });
      }
    }
    return res
      .status(200)
      .send({ message: "Asistentes eliminados correctamente" });
  });
};


module.exports = {
  createAsistente,
  // funciones de asistente de parvulo
  getAsistentes,
  getAsistente,
  getSelectionAsistentes,
  updateAsistente,
  deleteAsistente,
  deleteSelectionAsistentes,
};