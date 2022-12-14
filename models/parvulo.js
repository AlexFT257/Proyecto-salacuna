const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const parvuloSchema=new Schema({
    nombre:{
        type: String,
        required: true,
        minLenght: 1,
        maxLenght: 100
    },
    rut:{
        type: String,
        required: true,
        minLenght: 1,
        maxLenght: 11,
        unique: true
    },
    fechaNacimiento:{
        type: Date,
        required: true
    },
    direccion:{
        type: String,
        required: true,
        minLenght: 1,
        maxLenght: 100
    },
    telefonoEmergencia:{
        type: String,
        required: true,
        minLenght: 1,
        maxLenght:12
    },
    condicionesMedicas:{
        type: String,
        required: true
    },
    apoderado:{
        type: Schema.ObjectId,
        ref: 'user',
        required: true
    }

})

module.exports=mongoose.model('parvulo',parvuloSchema);
