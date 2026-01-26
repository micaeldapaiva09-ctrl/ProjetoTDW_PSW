const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nome: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ['admin', 'staff', 'cliente']
    }
});

module.exports = mongoose.model('User', UserSchema);
