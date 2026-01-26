const express = require("express");
const router = express.Router();
const Servico = require("../models/Servico");

// editar serviço
router.put("/:id", async (req, res) => {
  const servico = await Servico.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(servico);
});

// remover serviço
router.delete("/:id", async (req, res) => {
  await Servico.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
