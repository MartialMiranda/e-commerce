const path = require('path');
const usuarioModel = require('../models/usuarioModel');
const objUsuarioModel = new usuarioModel();

module.exports = {
    obtenerUsuarios: async (req, res) => {
        try {
            const data = await objUsuarioModel.obtenerUsuarios();
            res.json({ "Success": true, "Data": data });
        } catch (error) {
            res.json({ "Success": false, "Mensaje": error.message });
        }
    },

    GuardarUsuario: async (req, res) => {
        try {
            const data = {
                id: req.body.id,
                nombre: req.body.nombre,
                email: req.body.email,
                password: req.body.password,
                direccion: req.body.direccion,
                telefono: req.body.telefono,
                url_imagen_usuario: req.body.url_imagen_usuario
            };

            if (data.id == 0) {
                const resultado = await objUsuarioModel.guardarUsuario(data);
                res.json({ "Success": true, "Data": resultado.id });
            } else {
                await objUsuarioModel.modificarUsuario(data);
                res.json({ "Success": true });
            }
        } catch (error) {
            res.json({ "Success": false, "Mensaje": error.message });
        }
    },

    EliminarUsuario: async (req, res) => {
        try {
            const data = { id: req.body.id };
            await objUsuarioModel.eliminarUsuario(data);
            res.json({ "Success": true });
        } catch (error) {
            res.json({ "Success": false, "Mensaje": error.message });
        }
    }
};