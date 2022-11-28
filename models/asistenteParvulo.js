const { Number, Date } = require('mongoose');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const asistenteParvuloSchema = new Schema({
    nombre:{
        type: String,
        required: true,
        minLenght: 1,
        maxLenght: 100
    },
    apellido:{
        type: String,
        required: true,
        minLenght: 1,
        maxLenght: 100
    },
    rut:{
        type: String,
        required: true,
        unique: true
    },
    edad:{
        type: Number,
        requiered: true
    },
    fechaNa:{
        type: Date,
        required: true
    },
    mail:{
        type: String,
        required: true
    },
    domicilio:{
        type: String,
        required: true,
        minLenght: 1,
        maxLenght: 100
    },
    telefono:{
        type: String,
        requierd: true,
        minLenght: 8,
        maxLenght: 8
    }
    
})

module.exports= mongoose.model('asistente',asistenteParvuloSchema);