const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    nombre:{
        type: String,
        required: true,
    },
    apellido:{
        type: String,
        required: true,
    },
    rut:{
        type: String,
        required: true,
        unique: true,
    },
    mail:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        required: true,
        enum:[
            'parvularia',
            'asistente',
            'apoderado'
        ]
    },
    foto:{
        type: Schema.Types.ObjectId,
        ref: 'file',
        required: false
    },
    fechaNa:{
        type: Date,
        required: true
    },
    domicilio:{
        type: String,
        required: false // cambiar despues
    },
    telefono:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('user',userSchema);