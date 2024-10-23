// frontend/src/components/Logout.js
import React from 'react';
import { logout } from '../api';

const Logout = () => {
    const handleLogout = async () => {
        await logout(); // Puedes manejar la respuesta si es necesario
        localStorage.removeItem('token'); // Eliminar el token del localStorage
        alert('Logout exitoso!');
    };

    return (
        <div>
            <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
    );
};

export default Logout;
