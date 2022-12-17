const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: comprobar los datos solicitados en los cuestionarios
const actividadSchema = new Schema({
    fecha:{
        type: Date,
        required: true
    },
    titulo:{
        type: String,
        required: true
    },
    descripcion:{
        type: String,
        required: true
    },
    responsable:{
        type: Schema.ObjectId,
        ref: 'user',
        required: true
    },
    parvulos:[
        {
            type: Schema.ObjectId,
            ref: 'parvulo',
            required: false
        }
    ], 
    foto:{
        type: Schema.ObjectId,
        ref: 'file',
        required: false
    },
})

module.exports= mongoose.model('actividad',actividadSchema);