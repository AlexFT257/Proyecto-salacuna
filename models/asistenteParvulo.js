const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: comprobar los datos solicitados en los cuestionarios
const asistenteParvuloSchema = new Schema({
    name:{
        type: String,
        required: true,
        minLenght: 1,
        maxLenght: 100
    },
    rut:{
        type: String,
        required: true
    },
    mail:{
        type: String,
        required: true
    }
})