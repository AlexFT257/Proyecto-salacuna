const actividad = require("../models/actividad");
const AsistenteParvulo = require("../models/asistenteParvulo");

const createActividad = (req, res) => {
  const { fecha, hora, nombre, descripcion, asistenteParvulo } =
    req.body;
  const newActividad = new actividad({
    fecha,
    hora,
    nombre,
    descripcion,
    asistenteParvulo,
  });
  newActividad.save((error, actividad) => {
    if (error) {
        console.log(error);
      return res
        .status(400)
        .send({ message: "No se ha podido crear la actividad" });
    }
    return res.status(201).send(actividad);
  });
};

const getActividades = (req, res) => {
  actividad.find({})
  .populate('asistenteParvulo')
  .exec((error, actividades) => {
    if (error) {
      return res
        .status(400)
        .send({ message: "No se pudo realizar la busqueda" });
    }
    if (actividades.length === 0) {
      return res
        .status(404)
        .send({ message: "No se encontraron actividades" });
    }
    return res.status(200).send(actividades);
    });
};

const updateActividad = (req, res) => {
  const { id } = req.params;
  actividad.findByIdAndUpdate(id, req.body, (error, actividad) => {
    if (error) {
      return res
        .status(400)
        .send({ message: "No se pude actualizar la actividad" });
    }
    if (!actividad) {
      return res
        .status(400)
        .send({ message: "No se ha podido encontrar la actividad" });
    }
    return res.status(200).send({ message: "Actividad modificada", actividad });
  });
};

const deleteActividad = (req, res) => {
  const { id } = req.params;

  actividad.findOneAndDelete(id, (error, actividad) => {
    if (error) {
      return res
        .status(400)
        .send({ message: "No se pude eliminar la actividad" });
    }
    if (!actividad) {
      return res
        .status(400)
        .send({ message: "No se ha podido encontrar la actividad" });
    }
    return res
      .status(200)
      .send({ message: "Actividad eliminado correctamente" });
  });
};

const getActividad = (req, res) => {
    const { id } = req.params;
    actividad.findById(id)
    .populate('asistenteParvulo')
    .exec((error, actividad) => {
        if (error) {
            return res
            .status(400)
            .send({ message: "No se pudo realizar la busqueda" });
        }
        if (!actividad) {
            return res
            .status(404)
            .send({ message: "No se encontraron actividades" });
        }
        return res.status(200).send(actividad);
        }
    );
};

module.exports = {
    createActividad,
    getActividades,
    updateActividad,
    deleteActividad,
    getActividad,
};
