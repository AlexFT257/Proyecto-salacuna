const parvulo = require('../models/parvulo');
const createParvulo = (req,res)=>{
    // revisar la informacion solicitada en el cuestionario
    //fechaNacimiento,
    const{nombre,rut,edad,direccion,telefonoEmergencia,condicionesMedicas,nombreApoderado} = req.body;
    const newParvulo = new parvulo({
        nombre,
        rut,
        //fechaNacimiento,
        edad,
        direccion,
        telefonoEmergencia,
        condicionesMedicas,
        nombreApoderado
    })
    newParvulo.save((error,parvulo)=>{
        if(error){
            return res.status(400).send({message: "No se ha podido crear el parvulo"+error})
        }
        return res.status(201).send(parvulo)
    })
}

module.exports = {
        createParvulo,
    }
