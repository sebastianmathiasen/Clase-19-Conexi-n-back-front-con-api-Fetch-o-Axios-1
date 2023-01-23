const router = require('express').Router();
const uploadPic = require('../utils/handleStorage');
const userCt = require("./usersCt");

// get lo utilizo para traer la data
router.get("/", userCt.getAllUsers);
// post lo uso para crear un nuevo recurso
router.post("/", uploadPic.single('profilePic'), userCt.createUser);
// patch o put lo utilizo para update o modificar
router.patch("/:id", userCt.updateUser);
// delete lo uso para borrar la data
router.delete("/:id", userCt.deleteUserById);

module.exports = router;