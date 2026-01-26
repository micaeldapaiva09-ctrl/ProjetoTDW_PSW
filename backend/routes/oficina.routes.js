const express = require("express");
const router = express.Router();
const Oficina = require("../models/Oficina");
const Servico = require("../models/Servico");

// =====================
// OFICINAS
// =====================

// criar oficina
router.post("/", async (req, res) => {
  const oficina = await Oficina.create(req.body);
  res.status(201).json(oficina);
});

// listar oficinas
router.get("/", async (req, res) => {
  const oficinas = await Oficina.find();
  res.json(oficinas);
});

// editar oficina
router.put("/:id", async (req, res) => {
  const oficina = await Oficina.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(oficina);
});

// remover oficina
router.delete("/:id", async (req, res) => {
  await Oficina.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

// =====================
// SERVIÇOS
// =====================

// criar serviço numa oficina
router.post("/:id/servicos", async (req, res) => {
  const servico = await Servico.create({
    ...req.body,
    oficina: req.params.id
  });

  res.status(201).json(servico);
});

// listar serviços de uma oficina
router.get("/:id/servicos", async (req, res) => {
  const servicos = await Servico.find({ oficina: req.params.id });
  res.json(servicos);
});

// editar serviço
router.put("/servicos/:sid", async (req, res) => {
  const servico = await Servico.findByIdAndUpdate(
    req.params.sid,
    req.body,
    { new: true }
  );

  res.json(servico);
});

// remover serviço
router.delete("/servicos/:sid", async (req, res) => {
  await Servico.findByIdAndDelete(req.params.sid);
  res.sendStatus(204);
});

module.exports = router;
