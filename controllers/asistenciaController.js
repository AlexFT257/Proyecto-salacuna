const Asistencia = require('../models/asistencia.js');

const registrarAsistencia = (req, res) => {
    const { rut, fecha, parvulos } = req.body;
    const newAsistencia = new Asistencia({
        fecha,
        rut,
        parvulos
    });

    newAsistencia.save((error, asistencia) => {
        if(error){
            console.log(error);
            return res.status(400).send({
                message: "No se ha podido registrar la asistencia"
            });
        }

        return res.status(201).send(asistencia);
    });
}

const obtenerAsistencia = (req, res) => {
    Asistencia.find({}).sort('rut').populate({
        path: 'rut', select: 'ASISTENCIA_REGISTRADA.FECHA_REGISTRO ASISTENCIA_REGISTRADA.RUT_PARVULARIA ASISTENCIA_REGISTRADA.PARVULARIOS' 
    }).exec((error, asistencia) => {
        if(error){
            console.log(error);
            return res.status(400).send({
                message: "No se ha podido registrar la asistencia"
            });
        }

        if(asistencia.length === 0){
            console.log(error);
            return res.status(400).send({
                message: "No hay asistencias registradas"
            });
        }

        return res.status(200).send(asistencia);
    });
}

const actualizarAsistencia = (req, res) => {
    const { rut } = req.params;
    Asistencia.findOneAndUpdate(rut, req.body, (error, asistencia) => {
        if(error){
            console.log(error);
            return res.status(400).send({
                message: "No se ha podido actualizar la asistencia"
            });
        }

        if(!asistencia){
            console.log(error);
            return res.status(400).send({
                message: "No hay asistencias registradas con ese rut"
            });
        }

        return res.status(200).send(asistencia);
    });
}

const eliminarAsistencia = (req, res) => {
    const { rut } = req.params;
    Asistencia.findOneAndDelete(rut, (error, asistencia) => {
        if(error){
            console.log(error);
            return res.status(400).send({
                message: "No se ha podido eliminar la asistencia"
            });
        }

        if(!asistencia){
            console.log(error);
            return res.status(400).send({
                message: "No hay asistencias registradas con ese rut"
            });
        }

        return res.status(200).send("Asistencia eliminada correctamente");
    });
}
