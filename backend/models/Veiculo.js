const mongoose = require('mongoose');

const VeiculoSchema = new mongoose.Schema({
    marca: String,
    modelo: String,
    matricula: String,
    ano: Number,
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Veiculo', VeiculoSchema);
