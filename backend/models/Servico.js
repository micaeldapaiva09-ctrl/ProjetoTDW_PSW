const mongoose = require("mongoose");

const ServicoSchema = new mongoose.Schema({
  nome: String,
  descricao: String,
  preco: Number,
  oficina: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Oficina",
    required: true
  }
});

module.exports = mongoose.model("Servico", ServicoSchema);
