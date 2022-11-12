const parvulo = require('../models/parvulo');
const createParvulo = (req,res)=>{
    // revisar la informacion solicitada en el cuestionario
   
    const{nombre,rut, fechaNacimiento,edad,direccion,telefonoEmergencia,condicionesMedicas,nombreApoderado} = req.body;
    const newParvulo = new parvulo({
        nombre,
        rut,
        fechaNacimiento,
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

const getParvulos = (req,res)=>{
    parvulo.find({},(error,parvulos)=>{
        if(error){
            return res.status(400).send({message: "No se ha podido obtener los parvulos"})
        }
        if(parvulos.length===0){
            return res.status(404).send({message: "No hay parvulos"})
        }
        return res.status(200).send(parvulos)
    })
}

const updateParvulo = (req,res)=>{
    const {id}=req.params;
    parvulo.findByIdAndUpdate(id,req.body,(error,parvulo)=>{
        if(error){
            return res.status(400).send({message: "No se ha podido actualizar el parvulo"})
        }
        if(!parvulo){
            return res.status(404).send({message: "No se ha encontrado el parvulo"})
        }
        return res.status(200).send({message: "Parvulo modificado"})
    })
} 



module.exports = {
        createParvulo,
        getParvulos,
        updateParvulo
    }
