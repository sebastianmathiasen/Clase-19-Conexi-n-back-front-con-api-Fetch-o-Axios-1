require("dotenv").config();

const express = require("express");
// Requiero cors para poder usar un puerto desde un servidor externo
const cors = require("cors");
require("./config/db.js");

// Defino el servidor con la siguiente sentencia
const PORT = process.env.PORT || 3030;
const server = express();

// express core midlewares
server.use(express.static('public'));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// external middlewares, da la posibilidad de acceder desde cualquier lugar
server.use(cors());

// users routing
server.use('/api/users', require('./src/users/usersRt'));

// Digo que el server escuche un puerto determinado (3030), con mensaje de que esta corriendo
server.listen(PORT, (err) => {
    !err ?
        console.log(`Server up: http://localhost:${PORT}`)
        :
        console.log(`Server down due to: ${err}`);
});

// Todo: error handling