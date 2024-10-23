const express = require('express');
const app = express();


const cors = require('cors');
const port = 3000;
var bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/views', express.static(__dirname + '/views'));
const usuarioRoutes = require('./routes/usuarioRoutes');
app.use('/usuarios', usuarioRoutes);


app.listen(port, () => {
    console.log(`Escuchando en: http://localhost:${port}`);  
});