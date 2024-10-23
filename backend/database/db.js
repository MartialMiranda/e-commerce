// backend/database/db.js
const pgp = require('pg-promise')();
const db = pgp('postgres://postgres:root@localhost:5432/ecommerce'); // Cambia la URL según sea necesario

module.exports = db;
