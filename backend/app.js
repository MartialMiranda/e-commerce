// backend/app.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');


const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
