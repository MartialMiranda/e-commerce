// backend/models/userModel.js
const db = require('../database/db');

class UserModel {
    async findByEmail(email) {
        return db.oneOrNone('SELECT * FROM usuarios WHERE email = $1', [email]);
    }

    async create(user) {
        const { nombre, email, contraseña, direccion, telefono } = user;
        return db.one('INSERT INTO usuarios(nombre, email, contraseña, direccion, telefono) VALUES($1, $2, $3, $4, $5) RETURNING *', [nombre, email, contraseña, direccion, telefono]);
    }
}

module.exports = new UserModel();
