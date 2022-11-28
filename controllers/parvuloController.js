const parvulo = require('../models/parvulo');
const User = require('../models/user');

//crear parvulo
const createParvulo = (req,res)=>{
    //verificamos que el usuario tenga el rol de asistente  o parvularia
    const {rutUser}=req.params;
    User.findOne({rut:rutUser},(error,user)=>{
        if(error){
            return res.status(400).send({message:"Error al obtener el usuario"});
        }
        if(!user){
            return res.status(400).send({message:"Error al obtener el usuario (usuario vacio)"});
        }
        if(user.role!="asistente" && user.role!="parvularia"){
            return res.status(400).send({message:"Error, el usuario no es asistente de parvulo"});
        }
        //creamos el parvulo
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
})
}

//Obtener todos los parvulos
const getParvulos = (req,res)=>{
   // verficamos si el usuario tiene el rol de asistente o parvularia
    const {rutUser}=req.params;
    User.findOne({rut:rutUser},(error,user)=>{
        if(error){
            return res.status(400).send({message:"Error al obtener el usuario"});
        }
        if(!user){
            return res.status(400).send({message:"Error al obtener el usuario (usuario vacio)"});
        }
        if(user.role!="asistente" && user.role!="parvularia"){
            return res.status(400).send({message:"Error, el usuario no es asistente de parvulo"});
        }
        //obtenemos los parvulos
        parvulo.find({},(error,parvulos)=>{
            if(error){
                return res.status(400).send({message:"Error al obtener los parvulos"})
            }
            return res.status(200).send(parvulos)
        })
    })
};


//Actualizar parvulo por rut
const updateParvulo = (req,res)=>{
    //verificamos que el usuario tenga el rol de asistente  o parvularia
    const rutUser=req.params.rutUser;
    const rutPar=req.params.rutPar;
    User.findOne({rut:rutUser},(error,user)=>{
        if(error){
            return res.status(400).send({message:"Error al obtener el usuario"}+error);
        }
        if(!user){
            return res.status(400).send({message:"Error al obtener el usuario (usuario vacio)"});
        }
        if(user.role!="asistente" && user.role!="parvularia"){
            return res.status(400).send({message:"Error, el usuario no es asistente de parvulo"});
        }
        //actualizamos el parvulo
        parvulo.findOneAndUpdate({rut:rutPar},req.body,(error,parvulo)=>{
            if(error){
                return res.status(400).send({message:"Error al actualizar el parvulo"})
            }
            return res.status(200).send(parvulo)
        })
    })
};




//Eliminar parvulo por rut
const deleteParvulo = (req,res)=>{
    //verificamos que el usuario tenga el rol de asistente  o parvularia
    const rutUser=req.params.rutUser;
    const rutPar=req.params.rutPar;
    User.findOne({rut:rutUser},(error,user)=>{
        if(error){
            return res.status(400).send({message:"Error al obtener el usuario"});
        }
        if(!user){
            return res.status(400).send({message:"Error al obtener el usuario (usuario vacio)"});
        }
        if(user.role!="asistente" && user.role!="parvularia"){
            return res.status(400).send({message:"Error, el usuario no es asistente de parvulo"});
        }
        //eliminamos el parvulo
        parvulo.findOneAndDelete({rut:rutPar},(error,parvulo)=>{
            if(error){
                return res.status(400).send({message:"Error al eliminar el parvulo"})
            }
            return res.status(200).send(parvulo)
        })
    })
};

//Obtener parvulo por rut
const getOneParvulo = (req,res)=>{
    //verificamos que el usuario tenga el rol de asistente  o parvularia
    const rutUser=req.params.rutUser;
    const rutPar=req.params.rutPar;
    User.findOne({rut:rutUser},(error,user)=>{
        if(error){
            return res.status(400).send({message:"Error al obtener el usuario"});
        }
        if(!user){
            return res.status(400).send({message:"Error al obtener el usuario (usuario vacio)"});
        }
        if(user.role!="asistente" && user.role!="parvularia"){
            return res.status(400).send({message:"Error, el usuario no es asistente de parvulo"});
        }
        //obtenemos el parvulo
        parvulo.findOne({rut:rutPar},(error,parvulo)=>{
            if(error){
                return res.status(400).send({message:"Error al obtener el parvulo"})
            }
            return res.status(200).send(parvulo)
        }
        )
    }
    )
};

/*
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
};*/

module.exports = {
        createParvulo,
        getParvulos,
        updateParvulo,
        deleteParvulo,
        getOneParvulo
    }
