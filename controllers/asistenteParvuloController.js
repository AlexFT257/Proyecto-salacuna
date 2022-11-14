const AsistenteParvulo = require("../models/asistenteParvulo");

const createAsistente = (req, res) => {
  const { nombre, apellido, rut, mail, telefono, edad, fechaNa, domicilio } =
    req.body;
  const newAsistente = new AsistenteParvulo({
    nombre,
    apellido,
    rut,
    edad,
    fechaNa,
    mail,
    domicilio,
    telefono
  });
  newAsistente.save((error, asistente) => {
    if (error) {
        console.log(error);
      return res
        .status(400)
        .send({ message: "No se ha podido crear el asistente" });
    }
    return res.status(201).send(asistente);
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

const updateAsistente = (req, res) => {
  const { rut } = req.params;
  AsistenteParvulo.findOneAndUpdate(rut,req.body, (error, asistente) => {
    if (error) {
      return res
        .status(400)
        .send({ message: "No se pude actualizar el asistente de parvulo" });
    }
    if (!asistente) {
      return res
        .status(400)
        .send({ message: "No se ha podido encontrar al asistente de parvulo" });
    }
    return res.status(200).send({ message: "Asistente modificado" });
  });
};

const deleteAsistente = (req, res) => {
  const { rut } = req.params;
  AsistenteParvulo.findOneAndDelete(rut, (error, asistente) => {
    if (error) {
      return res
        .status(400)
        .send({ message: "No se pude eliminar el asistente de parvulo" });
    }
    if (!asistente) {
      return res
        .status(400)
        .send({ message: "No se ha podido encontrar al asistente de parvulo" });
    }
    return res
      .status(200)
      .send({ message: "Asistente eliminado correctamente" });
  });
};

const getAsistente = (req, res) => {
  const { rut } = req.body;
  AsistenteParvulo.findOne(rut, (error, asistente) => {
    if (error) {
      return res
        .status(400)
        .send({ message: "No se pude actualizar el asistente de parvulo" });
    }
    if (!asistente) {
      return res
        .status(400)
        .send({ message: "No se ha podido encontrar al asistente de parvulo" });
    }
    return res.status(200).send(asistente);
  });
};

module.exports = {
  createAsistente,
  getAsistentes, // devuelve todos los asistentes
  updateAsistente,
  deleteAsistente,
  getAsistente, // devuelve un asistente buscado por el rut
};
