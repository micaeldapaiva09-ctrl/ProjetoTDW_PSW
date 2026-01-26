const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
    const { nome, email, password, role } = req.body;

    const existe = await User.findOne({ email });
    if (existe) return res.status(400).json({ erro: 'Email já existe' });

    const user = await User.create({ nome, email, password, role });
    res.status(201).json(user);
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.password !== password)
        return res.status(400).json({ erro: 'Credenciais inválidas' });

    res.json({
        id: user._id,
        nome: user.nome,
        role: user.role
    });
});

module.exports = router;