const { Date } = require('mongoose');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const asistenciaSchema = new Schema({
    ASISTENCIA_REGISTRADA: {
        FECHA_REGISTRO: {type: Date, required: true},
        RUT_PARVULARIA: {type: Schema.Types.ObjectId, required: true, ref: 'rut'},
        PARVULARIOS: {type: String, value: [String], required: true}
    },
});

module.exports = mongoose.model('asistencia', asistenciaSchema);