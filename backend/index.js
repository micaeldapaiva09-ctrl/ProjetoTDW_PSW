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
// USERS
// ==========================
app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

app.get("/users", async (req, res) => {
  res.json(await User.find());
});

// ==========================
// LOGIN
// ==========================
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.password !== password) {
    return res.status(400).json({ erro: "Credenciais inválidas" });
  }

  res.json(user);
});

// ==========================
// VEÍCULOS
// ==========================
app.post("/veiculos", async (req, res) => {
  res.status(201).json(await Veiculo.create(req.body));
});

app.get("/veiculos", async (req, res) => {
  res.json(await Veiculo.find());
});

app.put("/veiculos/:id", async (req, res) => {
  res.json(
    await Veiculo.findByIdAndUpdate(req.params.id, req.body, { new: true })
  );
});

app.delete("/veiculos/:id", async (req, res) => {
  await Veiculo.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

// ==========================
// OFICINAS
// ==========================
app.post("/oficinas", async (req, res) => {
  res.status(201).json(await Oficina.create(req.body));
});

app.get("/oficinas", async (req, res) => {
  res.json(await Oficina.find());
});

/**
 * ✅ REMOVER OFICINA (IMPORTANTE)
 * Apaga primeiro os serviços da oficina
 */
app.delete("/oficinas/:id", async (req, res) => {
  try {
    await Servico.deleteMany({ oficina: req.params.id });
    await Oficina.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

// ==========================
// SERVIÇOS
// ==========================
app.post("/oficinas/:id/servicos", async (req, res) => {
  const servico = await Servico.create({
    ...req.body,
    oficina: req.params.id
  });
  res.status(201).json(servico);
});

app.get("/oficinas/:id/servicos", async (req, res) => {
  res.json(await Servico.find({ oficina: req.params.id }));
});

app.put("/servicos/:id", async (req, res) => {
  res.json(
    await Servico.findByIdAndUpdate(req.params.id, req.body, { new: true })
  );
});

app.delete("/servicos/:id", async (req, res) => {
  await Servico.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

// ==========================
// MARCAÇÕES
// ==========================
app.post("/marcacoes", async (req, res) => {
  res.status(201).json(await Marcacao.create(req.body));
});

app.get("/marcacoes", async (req, res) => {
  res.json(await Marcacao.find().populate("oficina"));
});

app.delete("/marcacoes/:id", async (req, res) => {
  await Marcacao.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

// ==========================
// SERVIDOR
// ==========================
app.listen(PORT, () => {
  console.log("Servidor na porta " + PORT);
});
