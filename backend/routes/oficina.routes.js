const express = require("express");
const router = express.Router();
const Oficina = require("../models/Oficina");
const Servico = require("../models/Servico");
const Marcacao = require("../models/Marcacao");
const auth = require("../middlewares/auth");
const role = require("../middlewares/role");
const OficinasController = require("../controllers/OficinasController");

 

// criar oficina
router.post("/", async (req, res) => {
  const oficina = await Oficina.create(req.body);
  res.status(201).json(oficina);
});


router.get("/", async (req, res) => {
  const oficinas = await Oficina.find();
  res.json(oficinas);
});


router.put("/:id", async (req, res) => {
  const oficina = await Oficina.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(oficina);
});

router.delete("/:id", async (req, res) => {
  try {
    const oficinaId = req.params.id;

    
    await Servico.deleteMany({ oficina: oficinaId });

    
    await Marcacao.deleteMany({ oficina: oficinaId });

    
    await Oficina.findByIdAndDelete(oficinaId);

    res.sendStatus(204);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});


// criar serviço
router.post("/:id/servicos", async (req, res) => {
  const servico = await Servico.create({
    ...req.body,
    oficina: req.params.id
  });

  res.status(201).json(servico);
});


router.get("/:id/servicos", async (req, res) => {
  const servicos = await Servico.find({ oficina: req.params.id });
  res.json(servicos);
});


router.put("/servicos/:sid", async (req, res) => {
  const servico = await Servico.findByIdAndUpdate(
    req.params.sid,
    req.body,
    { new: true }
  );

  res.json(servico);
});


router.delete("/servicos/:sid", async (req, res) => {
  await Servico.findByIdAndDelete(req.params.sid);
  res.sendStatus(204);
});

module.exports = router;
