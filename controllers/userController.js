const User = require('../models/user');

const createUser = (req,res)=>{
    const {nombre,apellido,rut,mail,role,foto,fechaNa,domicilio,telefono} = req.body;
    const newUser =new User({nombre,apellido,rut,mail,role,foto,fechaNa,domicilio,telefono});
    newUser.save((err,user)=>{
        console.log(err);
        if(err){
            return res.status(400).send({message: 'Error al crear el usuario'});
        }
        return res.status(201).send(user);
    })
}

const getUsers = (req,res)=>{
    User.find({},(err,user)=>{
        if(err){
            return res.status(400).send({message: 'Error al obtener los usuarios'});
        }
        return res.status(200).send(user);
    })
}

// funciones de asistente de parvulo
const getAsistentes = (req,res)=>{
    User.find({'role':'asistente'},(err,user)=>{
        if(err){
            return res.status(400).send({message: 'Error al obtener los usuarios'});
        }
        return res.status(200).send(user);
    });
}

const getAsistente = (req,res)=>{
    const {rut}= req.params;
    User.findOne(rut,(err,user)=>{
        if(err){
            return res.status(400).send({message: 'Error al obtener el usuario'});
        }
        if(!user){
            return res.status(400).send({message: 'Error al obtener el usuario'});
        }
        if(user.role!='asistente'){
            return res.status(400).send({message: 'Error, el usuario no es asistente de parvulo'});
        }
        return res.status(200).send(user);
    });
}

const updateAsistente = (req,res)=>{
    const {rut}= req.params;
    User.findOneAndUpdate(rut,req.body,(err,user)=>{
        if(err){
            return res.status(400).send({message: 'Error al obtener el usuario'});
        }
        if(!user){
            return res.status(400).send({message: 'Error al obtener el usuario'});
        }
        if(user.role!='asistente'){
            return res.status(400).send({message: 'Error, el usuario no es asistente de parvulo'});
        }
        return res.status(200).send({message: "Asistente modificado correctamente"});
    });
}

const deleteAsistente = (req,res)=>{
    const {rut}= req.params;
    User.findOneAndDelete(rut,(err,user)=>{
        if(err){
            return res.status(400).send({message: 'Error al obtener el usuario'});
        }
        if(!user){
            return res.status(400).send({message: 'Error al obtener el usuario'});
        }
        if(user.role!='asistente'){
            return res.status(400).send({message: 'Error, el usuario no es asistente de parvulo'});
        }
        return res.status(200).send({message: "Asistente eliminado correctamente"});
    });
}

module.exports = {
    createUser,
    getUsers,
    // funciones de asistente de parvulo
    getAsistentes,
    getAsistente,
    updateAsistente,
    deleteAsistente,

}