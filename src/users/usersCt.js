// Me conecto a travez del modelo para poder trabajar con la base de datos
const User = require("./usersMd");

// Importo la encriptacion de password
const bc = require("../utils/handlePassword");

// importo direccion publica
const public_url = process.env.public_url;

const hs = require("../utils/handleStorage");

console.log(hs.file);

// get all users 
const getAllUsers = (req, res) => {
    // Metodo find me trae todo de una coleccion en particular
    User.find().then((data) => {
        !data.length
            ? res.status(404).json({ message: "not found" })
            : res.status(200).json();
        res.json(data);
    }).catch((error) => console.log(error))
};

// create user 
const createUser = async (req, res) => {
    console.log(req.file);
    // Trabajo con la imagen para guardarla
    const profilePic = `${public_url}/storage/${req.file.fileimage}`;
    // Aqui es donde encripto la contrasenia y la paso
    const password = await bc.hashPassword(req.body.password);

    // Y en el send cambio la contrasenia que voy a guardar por la encriptada

    //Send to database
    const newUser = new User({ ...req.body, profilePic, password });
    newUser.save((error) => {
        if (error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(200).json(newUser);
        }
    });
};

// Update user
const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: "Usuario con cambios", usuario: user });
        console.log(user);
    } catch (error) {
        res.status(404).json({ message: "Usuario no actualizado" })
    }
};

// delete user by id
const deleteUserById = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ user: user.id, message: "Usuario borrado" });
    } catch (error) {
        res.status(404).json({ message: "Usuario no encontrado" });
    }
}

module.exports = { getAllUsers, createUser, updateUser, deleteUserById };