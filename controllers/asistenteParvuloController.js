const AsistenteParvulo = require('../models/asistenteParvulo');

const createAsistente = (req,res)=>{
    // revisar la informacion solicitada en el cuestionario
    const{name,rut,mail} = req.body;
    const newAsistente = new AsistenteParvulo({
        name,
        rut,
        mail
    })
    newAsistente.save((error,asistente)=>{
        if(error){
            return res.status(400).send({message: "No se ha podido crear el asistente"})
        }
        return res.status(201).send(asistente)
    })
}



module.exports = {
    createAsistente,
}
