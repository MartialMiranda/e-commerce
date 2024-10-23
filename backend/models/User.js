const db = require('../config/db');
const bcrypt = require('bcrypt');

const User = {
    findByEmail: async (email) => {
        const user = await db.oneOrNone('SELECT * FROM usuarios WHERE email = $1', [email]);
        return user;
    },
    
    create: async (nombre, email, contraseña) => {
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        return await db.one(
            'INSERT INTO usuarios(nombre, email, contraseña) VALUES($1, $2, $3) RETURNING *',
            [nombre, email, hashedPassword]
        );
    },

    verifyPassword: async (contraseña, hashedPassword) => {
        return await bcrypt.compare(contraseña, hashedPassword);
    }
};

module.exports = User;
