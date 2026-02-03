// routes/marcacao.routes.js
const express = require("express");
const router = express.Router();
const Marcacao = require("../models/Marcacao");

// 🔹 criar marcação
router.post("/", async (req, res) => {
  try {
    const { oficina, servico, dataHora } = req.body;

    if (!oficina || !servico || !dataHora) {
      return res.status(400).json({ erro: "Dados incompletos" });
    }

    const marcacao = await Marcacao.create({
      oficina,
      servico,
      dataHora
    });

    res.status(201).json(marcacao);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao criar marcação" });
  }
});

// 🔹 listar marcações
router.get("/", async (req, res) => {
  try {
    const marcacoes = await Marcacao.find()
      .populate("oficina")
      .populate("servico")
      .sort({ dataHora: 1 });

    res.json(marcacoes);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao listar marcações" });
  }
});

module.exports = router;
