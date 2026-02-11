const express = require("express");
const router = express.Router();
const Veiculo = require("../models/Veiculo");
const auth = require("../middlewares/auth");
const role = require("../middlewares/role");
const VeiculosController = require("../controllers/VeiculosController");


router.get("/", auth, VeiculosController.listar);


router.post("/", auth, role("cliente"), VeiculosController.criar);


router.put("/:id", auth, role("staff", "admin"), VeiculosController.editar);


router.delete("/:id", auth, role("admin"), VeiculosController.apagar);


router.post("/", async (req, res) => {
  const veiculo = await Veiculo.create(req.body);
  res.status(201).json(veiculo);
});


router.get("/", async (req, res) => {
  const veiculos = await Veiculo.find();
  res.json(veiculos);
});


router.put("/:id", async (req, res) => {
  const veiculo = await Veiculo.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(veiculo);
});


router.delete("/:id", async (req, res) => {
  await Veiculo.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
