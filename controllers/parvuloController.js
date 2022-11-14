const parvulo = require('../models/parvulo');
//crear parvulo
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
};
//Obtener todos los parvulos
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
};
//Actualizar parvulo por rut
const updateParvulo = (req,res)=>{
    const {rut}=req.params;
    parvulo.findOneAndUpdate({rut},req.body,(error,parvulo)=>{
        if(error){
            return res.status(400).send({message: "No se ha podido actualizar el parvulo"})
        }
        if(!parvulo){
            return res.status(404).send({message: "No se ha encontrado el parvulo"})
        }
        return res.status(200).send({message: "Parvulo modificado"})
    })
} ;

//Eliminar parvulo por rut
const deleteParvulo = (req,res)=>{
    const {rut}=req.params.rut;
    parvulo.findOneAndDelete(rut,(error,parvulo)=>{
        if(error){
            return res.status(400).send({message: "No se ha podido eliminar el parvulo"})
        }
        if(!parvulo){
            return res.status(404).send({message: "No se ha encontrado el parvulo"})
        }
        return res.status(200).send({message: "Parvulo eliminado"})
    })
};
//Obtener parvulo por rut
const getOneParvulo = (req,res)=>{
    const {rut}=req.params;
    parvulo.findOne({rut},(error,parvulo)=>{
        if(error){
            return res.status(400).send({message: "No se ha podido obtener el parvulo" + error})
        }
        if(!parvulo){
            return res.status(404).send({message: "No se ha encontrado el parvulo"})
        }
        return res.status(200).send(parvulo)
    })
};

module.exports = {
        createParvulo,
        getParvulos,
        updateParvulo,
        deleteParvulo,
        getOneParvulo
 };