const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// ==========================
// MODELOS
// ==========================
const User = require("./models/User");
const Veiculo = require("./models/Veiculo");
const Oficina = require("./models/Oficina");
const Servico = require("./models/Servico");
const Marcacao = require("./models/Marcacao");

const app = express();
const PORT = 3000;

// ==========================
// MIDDLEWARES
// ==========================
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

// ==========================
// MONGODB
// ==========================
mongoose
  .connect("mongodb://127.0.0.1:27017/projeto_oficina")
  .then(() => console.log("MongoDB ligado"))
  .catch(err => console.error("Erro MongoDB:", err));

// ==========================
// ROTA TESTE
// ==========================
app.get("/", (req, res) => {
  res.send("Backend a funcionar");
});

// ==========================
// ROTA 1 — USERS / REGISTO
// ==========================
app.post("/users", async (req, res) => {
  const { nome, email, password } = req.body;

  if (!nome || !email || !password) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
  }

  try {
    const user = await User.create({
      nome,
      email,
      password,
      role: "cliente"
    });

    res.status(201).json(user);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ erro: "Email já existe" });
    }
    res.status(400).json({ erro: error.message });
  }
});

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// ==========================
// ROTA 2 — LOGIN
// ==========================
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(400).json({ erro: "Credenciais inválidas" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// ==========================
// ROTA 3 — VEÍCULOS
// ==========================
app.post("/veiculos", async (req, res) => {
  try {
    const veiculo = await Veiculo.create(req.body);
    res.status(201).json(veiculo);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

app.get("/veiculos", async (req, res) => {
  const veiculos = await Veiculo.find();
  res.json(veiculos);
});

app.put("/veiculos/:id", async (req, res) => {
  try {
    const veiculo = await Veiculo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(veiculo);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

app.delete("/veiculos/:id", async (req, res) => {
  try {
    await Veiculo.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

// ==========================
// ROTA 4 — OFICINAS
// ==========================
app.post("/oficinas", async (req, res) => {
  try {
    const oficina = await Oficina.create(req.body);
    res.status(201).json(oficina);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

app.get("/oficinas", async (req, res) => {
  const oficinas = await Oficina.find();
  res.json(oficinas);
});

// ==========================
// ROTA 5 — SERVIÇOS (POR OFICINA)
// ==========================
app.post("/oficinas/:id/servicos", async (req, res) => {
  try {
    const servico = await Servico.create({
      ...req.body,
      oficina: req.params.id
    });

    res.status(201).json(servico);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

app.get("/oficinas/:id/servicos", async (req, res) => {
  try {
    const servicos = await Servico.find({ oficina: req.params.id });
    res.json(servicos);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

app.put("/servicos/:id", async (req, res) => {
  try {
    const servico = await Servico.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(servico);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

app.delete("/servicos/:id", async (req, res) => {
  try {
    await Servico.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

// ==========================
// ROTA 6 — MARCAÇÕES (COM OFICINA)
// ==========================
app.post("/marcacoes", async (req, res) => {
  try {
    const marcacao = await Marcacao.create(req.body);
    res.status(201).json(marcacao);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

app.get("/marcacoes", async (req, res) => {
  const marcacoes = await Marcacao.find().populate("oficina");
  res.json(marcacoes);
});

app.delete("/marcacoes/:id", async (req, res) => {
  try {
    await Marcacao.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

// ==========================
// SERVIDOR
// ==========================
app.listen(PORT, () => {
  console.log("Servidor na porta " + PORT);
});
