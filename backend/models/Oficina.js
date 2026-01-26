const mongoose = require('mongoose');

const OficinaSchema = new mongoose.Schema({
    nome: String,
    localizacao: String,
    contacto: String
});

module.exports = mongoose.model('Oficina', OficinaSchema);
