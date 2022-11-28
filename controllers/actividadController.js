const actividad = require("../models/actividad");
const User = require("../models/user");

//Metodos verificando rol del usuario

const createActividad = (req, res) => {
  //Verificar que el usuario tenga rol de asistenteParvulo o parvularia
  const { id } = req.params.usuarioId;
  User.findById(id, (err, user) => {
    if (err) {
      return res.status(400).send({ message: "Error al obtener el usuario" });
    }
    if (user.role === "parvularia" || user.role === "asistenteParvulo") {
      const newActividad = new actividad({
        fecha: req.body.fecha,
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        responsable: req.params.usuarioId,
        parvulos: req.body.parvulos,
        foto: req.body.foto,
      });
      newActividad.save((err, actividad) => {
        if (err) {
          return res.status(400).send({ message: "Error al crear la actividad" });
        }
        return res.status(201).send(actividad);
      });
    } else {
      return res.status(400).send({ message: "No tiene permisos para crear una actividad" });
    }
  });
};

const getActividades = (req, res) => {
  //Verificar que el usuario tenga rol de asistenteParvulo o parvularia
  const { id } = req.params.usuarioId;
  User.findById(id, (err, user) => {
    if (err) {
      return res.status(400).send({ message: "Error al obtener el usuario" });
    }
    if (user.role === "parvularia" || user.role === "asistenteParvulo") {
      actividad.find({})
      .populate('responsable')
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
    } else {
      return res.status(400).send({ message: "No tiene permisos para obtener las actividades" });
    }
  });
};

const getActividad = (req, res) => {
  //Verificar que el usuario tenga rol de asistenteParvulo o parvularia
  const { userId } = req.params.usuarioId;
  User.findById(userId, (err, user) => {
    if (err) {
      return res.status(400).send({ message: "Error al obtener el usuario" });
    }
    if (user.role === "parvularia" || user.role === "asistenteParvulo") {
      const { id } = req.params;
      actividad.findById(id)
      .populate('responsable')
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
    } else {
      return res.status(400).send({ message: "No tiene permisos para obtener la actividad" });
    }
  });
};

const updateActividad = (req, res) => {
  //Verificar que el usuario tenga rol de asistenteParvulo o parvularia
  const { usuarioId } = req.params.usuarioId;
  User.findById(id, (err, user) => {
    if (err) {
      return res.status(400).send({ message: "Error al obtener el usuario" });
    }
    if (user.role === "parvularia" || user.role === "asistenteParvulo") {
      const { id } = req.params;
      actividad.findByIdAndUpdate( id, req.body, (error, actividad) => {
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
    } else {
      return res.status(400).send({ message: "No tiene permisos para actualizar la actividad" });
    }
  });
};

const deleteActividad = (req, res) => {
  //Verificar que el usuario tenga rol de asistenteParvulo o parvularia
  const { usuarioId } = req.params.usuarioId;
  User.findById(id, (err, user) => {
    if (err) {
      return res.status(400).send({ message: "Error al obtener el usuario" });
    }
    if (user.role === "parvularia" || user.role === "asistenteParvulo") {
      const { id } = req.params;
      actividad.findByIdAndDelete(id, (error, actividad) => {
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
    } else {
      return res.status(400).send({ message: "No tiene permisos para eliminar la actividad" });
    }
  });
};

const getActividadesByParvulo = (req, res) => {
  //Verificar que el usuario tenga rol de asistenteParvulo o parvularia
  const { usuarioId } = req.params.usuarioId;
  User.findById(id, (err, user) => {
    if (err) {
      return res.status(400).send({ message: "Error al obtener el usuario" });
    }
    if (user.role === "parvularia" || user.role === "asistenteParvulo") {
      const { parvuloId } = req.params;
      actividad.find({parvulo: parvuloId})
      .populate('responsable')
      .exec((error, actividades) => {
          if (error) {
              return res
              .status(400)
              .send({ message: "No se pudo realizar la busqueda" });
          }
          if (!actividades) {
              return res
              .status(404)
              .send({ message: "No se encontraron actividades" });
          }
          return res.status(200).send(actividades);
          }
      );
    } else {
      return res.status(400).send({ message: "No tiene permisos para obtener las actividades" });
    }
  });
};

/*const createActividad = (req, res) => {
  
  if (req.body.asistenteParvulo) {

  const { fecha, hora, nombre, descripcion, asistenteParvulo } = req.body;
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
};*/

module.exports = {
    createActividad,
    getActividades,
    updateActividad,
    deleteActividad,
    getActividad,
};
