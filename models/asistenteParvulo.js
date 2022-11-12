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
        requiered: false
    },
    fechaNa:{
        type: Date,
        required: false
    },
    mail:{
        type: String,
        required: false
    },
    domicilio:{
        type: String,
        required: false,
        minLenght: 1,
        maxLenght: 100
    },
    telefono:{
        type: String,
        requierd: true,
        minLenght: 8,
        maxLenght: 8
    }
    /* 
        todo: ver como manejar las fotos
    foto:{
    
    }
    */
    

})

module.exports= mongoose.model('asistente',asistenteParvuloSchema);