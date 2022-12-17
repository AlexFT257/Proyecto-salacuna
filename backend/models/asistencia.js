const { Date } = require('mongoose');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const asistenciaSchema = new Schema({
        fecha: {type: Date, required: true},
        rut: {type: Schema.Types.ObjectId, required: true},
        parvularios: {type: String, value: [String], required: true}
});

module.exports = mongoose.model('asistencia', asistenciaSchema);