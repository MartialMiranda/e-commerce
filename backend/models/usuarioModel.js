const dao = require('./dao');
const bcrypt = require('bcrypt');
const objDao = new dao();

class usuarioModel {
    constructor () {}

    async obtenerUsuarios() {
        const sql = "SELECT id, nombre, email, direccion, telefono, url_imagen_usuario, fecha_registro FROM usuarios";
        return objDao.consultar(sql);
    }

    async buscarUsuarioPorEmail(email) {
        const sql = "SELECT COUNT(*) as count FROM usuarios WHERE email = $1";
        const result = await objDao.consultar(sql, [email]);
        return result[0].count > 0;
    }

    async guardarUsuario(data) {
        // Verificar si el email ya existe
        const existeEmail = await this.buscarUsuarioPorEmail(data.email);
        if (existeEmail) {
            throw new Error("El email ya está registrado");
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const sql = `
            INSERT INTO usuarios(nombre, email, contraseña, direccion, telefono, url_imagen_usuario) 
            VALUES($1, $2, $3, $4, $5, $6) 
            RETURNING id`;
        const params = [
            data.nombre,
            data.email,
            hashedPassword,
            data.direccion,
            data.telefono,
            data.url_imagen_usuario
        ];
        return objDao.insertar(sql, params);
    }

    async modificarUsuario(data) {
        let sql, params;
        
        if (data.password && data.password.trim() !== '') {
            // Si se proporciona una nueva contraseña, actualizarla también
            const hashedPassword = await bcrypt.hash(data.password, 10);
            sql = `
                UPDATE usuarios 
                SET nombre=$1, email=$2, contraseña=$3, direccion=$4, telefono=$5, url_imagen_usuario=$6 
                WHERE id=$7`;
            params = [
                data.nombre,
                data.email,
                hashedPassword,
                data.direccion,
                data.telefono,
                data.url_imagen_usuario,
                data.id
            ];
        } else {
            // Si no se proporciona contraseña, mantener la existente
            sql = `
                UPDATE usuarios 
                SET nombre=$1, email=$2, direccion=$3, telefono=$4, url_imagen_usuario=$5 
                WHERE id=$6`;
            params = [
                data.nombre,
                data.email,
                data.direccion,
                data.telefono,
                data.url_imagen_usuario,
                data.id
            ];
        }
        
        return objDao.ejecutar(sql, params);
    }

    async eliminarUsuario(data) {
        const sql = "DELETE FROM usuarios WHERE id=$1";
        const params = [data.id];  
        return objDao.ejecutar(sql, params);
    }
}

module.exports = usuarioModel;