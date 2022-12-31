const parvulo = require('../models/parvulo');
const user = require('../models/user');

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
    parvulo.findOneAndUpdate({rut:rut},req.body,(error,parvulo)=>{
        if(error){
            return res.status(400).send({message: "No se ha podido actualizar el parvulo"})
        }
        if(!parvulo){
            return res.status(404).send({message: "No se ha encontrado el parvulo"})
        }
        return res.status(200).send(parvulo)
    })
} ;

//Eliminar parvulo por rut
const deleteParvulo = (req,res)=>{
    const {rut}=req.params;
    parvulo.findOneAndDelete({rut},(error,parvulo)=>{
        if(error){
            return res.status(400).send({message: "No se ha podido eliminar el parvulo"+error})
        }
        if(!parvulo){
            return res.status(404).send({message: "No se ha encontrado el parvulo"+error})
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


// validar que exista un usurio por Schema.ObjectId ref user
const createParvulo = (req,res)=>{
    const{nombre,rut, fechaNacimiento,edad,direccion,telefonoEmergencia,condicionesMedicas,apoderado} = req.body;
    user.findById({_id:apoderado},(error,user)=>{
        if(error){
            return res.status(400).send({message: "error al validar el aopoderado"})
        }
        if(!user){
            return res.status(404).send({message: "apoderado usuario no existe"})
        }
        if(user.role != "apoderado"){
            return res.status(400).send({message: "El USUARIO NO ES APODERADO, INGRESE UN USUARIO CON ROL DE APODERADO"})
        }
        const newParvulo = new parvulo({
            nombre,
            rut,
            fechaNacimiento,
            edad,
            direccion,
            telefonoEmergencia,
            condicionesMedicas,
            apoderado
        })
        newParvulo.save((error,parvulo)=>{
            if(error){
                return res.status(400).send({message: "No se ha podido crear el parvulo"+error})
            }
            return res.status(201).send(parvulo)
        })
    })
}

//obterner parvulos de un apoderado
const getParvulosByApoderado = (req,res)=>{
    const {apoderado}=req.params;
    parvulo.find({apoderado:apoderado},(error,parvulos)=>{
        if(error){
            return res.status(400).send({message: "No se ha podido obtener los parvulos"})
        }
        if(parvulos.length===0){
            return res.status(404).send({message: "No hay parvulos"})
        }
        return res.status(200).send(parvulos)
    }
    )
}





module.exports = {
        createParvulo,
        getParvulos,
        updateParvulo,
        deleteParvulo,
        getOneParvulo,
        createParvulo,
        getParvulosByApoderado
    }
