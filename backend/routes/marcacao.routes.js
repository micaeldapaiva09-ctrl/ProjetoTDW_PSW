const express = require("express");
const router = express.Router();
const Marcacao = require("../models/Marcacao");

// criar
router.post("/", async (req, res) => {
  const { cliente, veiculo, oficina, servico, dataHora } = req.body;

  const conflito = await Marcacao.findOne({
    oficina,
    dataHora,
    estado: { $ne: "Cancelada" }
  });

  if (conflito) {
    return res.status(400).json({ erro: "Horário indisponível" });
  }

  const marcacao = await Marcacao.create({
    cliente,
    veiculo,
    oficina,
    servico,
    dataHora,
    estado: "Ativa"
  });

  res.status(201).json(marcacao);
});

// listar TODAS
router.get("/", async (req, res) => {
  const marcacoes = await Marcacao.find()
    .populate("oficina servico veiculo cliente");

  res.json(marcacoes);
});

// editar
router.put("/:id", async (req, res) => {
  const marcacao = await Marcacao.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(marcacao);
});

// atualizar estado
router.put("/:id/estado", async (req, res) => {
  const marcacao = await Marcacao.findByIdAndUpdate(
    req.params.id,
    { estado: req.body.estado },
    { new: true }
  );
  res.json(marcacao);
});

// remover
router.delete("/:id", async (req, res) => {
  await Marcacao.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
