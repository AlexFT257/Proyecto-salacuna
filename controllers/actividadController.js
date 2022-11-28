const actividad = require("../models/actividad");
const parvulo = require("../models/parvulo");

const createActividad = (req, res) => {
  if (req.body.responsable) {
    const { fecha, titulo, descripcion, responsable, parvulos, foto } = req.body;
    const newActividad = new actividad({
      fecha,    
      titulo,
      descripcion,
      responsable,
      parvulos,
      foto,
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
  }
};

const getActividades = (req, res) => {
  actividad.find({})
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

getActividadesByApoderado = (req, res) => {
    apoderadoId = req.get('X-Caller-Id');
    if(!apoderadoId){
        return res.status(400).send({message: "No se ha encontrado el apoderado"});
    }
    parvulo.find({apoderado: apoderadoId}) 
    .populate('apoderado')
    .exec((error, parvulos) => {
        if (error) {
            return res
            .status(400)
            .send({ message: "No se pudo realizar la busqueda" });
        }
        if (parvulos.length === 0) {
            return res  
            .status(404)
            .send({ message: "No se encontraron parvulos" });
        }
        parvulos.map(parvulo => parvulo._id);
        
        actividad.find({parvulos: {$in: parvulos}})
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
    });
};


module.exports = {
    createActividad,
    getActividades,
    updateActividad,
    deleteActividad,
    getActividad,
};
