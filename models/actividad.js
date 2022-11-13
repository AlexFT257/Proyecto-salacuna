const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: comprobar los datos solicitados en los cuestionarios
const actividadSchema = new Schema({
    fecha:{
        type: Date,
        required: true
    },
    hora:{
        type: String,
        required: true
    },
    nombre:{
        type: String,
        required: true
    },
    descripcion:{
        type: String,
        required: true
    },
    asistenteParvulo:{
        type: Schema.ObjectId,
        ref: 'asistente',
        required: true
    },
})

module.exports= mongoose.model('actividad',actividadSchema);