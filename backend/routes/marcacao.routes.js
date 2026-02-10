// routes/marcacao.routes.js
const express = require("express");
const router = express.Router();
const Marcacao = require("../models/Marcacao");
const auth = require("../middlewares/auth");
const role = require("../middlewares/role");
const MarcacoesController = require("../controllers/MarcacoesController");

router.get("/", auth, MarcacoesController.listar);

// ➕ CLIENTE cria marcação
router.post("/", auth, role("cliente", "admin"), MarcacoesController.criar);

// ✏️ STAFF + ADMIN gerem
router.put("/:id", auth, role("staff", "admin"), MarcacoesController.editar);

// 🗑️ ADMIN
router.delete("/:id", auth, role("admin"), MarcacoesController.apagar);

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
