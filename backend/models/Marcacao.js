const mongoose = require("mongoose");

const MarcacaoSchema = new mongoose.Schema({
  dataHora: {
    type: Date,
    required: true
  },
  oficina: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Oficina",
    required: true
  }
});

module.exports = mongoose.model("Marcacao", MarcacaoSchema);
