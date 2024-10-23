const User = require('../models/User');
const jwtUtils = require('../utils/jwtUtils');

const authController = {
    login: async (req, res) => {
        const { email, contraseña } = req.body;

        try {
            const user = await User.findByEmail(email);
            if (!user) {
                return res.status(400).json({ message: 'Usuario no encontrado' });
            }

            const validPassword = await User.verifyPassword(contraseña, user.contraseña);
            if (!validPassword) {
                return res.status(400).json({ message: 'Contraseña incorrecta' });
            }

            const token = jwtUtils.generateToken(user);
            res.json({ token, user });
        } catch (err) {
            res.status(500).json({ message: 'Error del servidor' });
        }
    },

    register: async (req, res) => {
        const { nombre, email, contraseña } = req.body;

        try {
            const existingUser = await User.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: 'El usuario ya existe' });
            }

            const newUser = await User.create(nombre, email, contraseña);
            const token = jwtUtils.generateToken(newUser);

            res.json({ token, newUser });
        } catch (err) {
            res.status(500).json({ message: 'Error del servidor' });
        }
    },

    profile: async (req, res) => {
        const user = req.user;
        res.json({ user });
    }
};

module.exports = authController;
