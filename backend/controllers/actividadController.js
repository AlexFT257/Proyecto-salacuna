const actividad = require("../models/actividad");
const Actividad = require("../models/actividad");
const User = require("../models/user");

const createActividad = (req, res) => {
  if (req.body.responsable) {
    const user = User.findById(req.body.responsable);
    if (user.role === "apoderado") {
      return res.status(403).send({ message: "Usuario responsable no autorizado" });
    }
    const { fecha, titulo, descripcion, responsable, parvulos, foto } = req.body;
    let newActividad;
    //cambiar esto
    if (foto == ""){
      newActividad = new Actividad({
        fecha,    
        titulo,
        descripcion,
        responsable,
        parvulos,
      });
    } else {
      newActividad = new Actividad({
        fecha,    
        titulo,
        descripcion,
        responsable,
        parvulos,
        foto,
      });
    }

    newActividad.save((error, actividad) => {
      if (error) {
        return res.status(400).send({ message: "No se pudo crear la actividad" });
      }
      if (!actividad) {
        return res.status(400).send({ message: "No se ha podido crear la actividad" });
      }
      return res.status(201).send(actividad);
    });
  } else {
    return res.status(400).send({ message: "Usuario responsable no ingresado" });
  }
};

const getActividades = (req, res) => {
  Actividad.find({})
  .populate('responsable')
  .populate('parvulos')
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
  Actividad.findByIdAndUpdate(id, req.body)
  .populate('responsable')
  .populate('parvulos')
  .exec(
   (error, actividad) => {
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
    return res.status(200).send(actividad);
  });
};

const deleteActividad = (req, res) => {
  const { id } = req.params;

  Actividad.findByIdAndDelete(id, (error, actividad) => {
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
    Actividad.findById(id)
    .populate('responsable')
    .populate('parvulos')
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

const getActividadesByParvulo = (req, res) => {
    const { id } = req.params;
    Actividad.find({parvulos: id})
    .populate('responsable')
    .populate('parvulos')
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
        }
    );
};

const getActividadesByResponsable = (req, res) => {
    const { id } = req.params;
    Actividad.find({responsable: id})
    .populate('responsable')
    .populate('parvulos')
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
        }
    );
};

module.exports = {
    createActividad,
    getActividades,
    updateActividad,
    deleteActividad,
    getActividad,
    getActividadesByParvulo,
    getActividadesByResponsable
};
