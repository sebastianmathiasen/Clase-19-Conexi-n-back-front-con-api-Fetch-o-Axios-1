const multer = require("multer");
// creamos una constante con un metodo de multer de almacenamiento en disco, indicando tres parametros, la request, un archivo y un callback
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        // dirname me lleva directamente a la carpeta en la que estoy ahora 
        const pathStorage = `${__dirname}/../../public/storage`;
        callback(null, pathStorage);
    },
    filename: (req, file, callback) => {
        console.log(file);
        // Primero separo el nombre de la extencion (jpg ej) para cambiar el nombre y conservarlo
        const ext = file.originalname.split(".").pop();
        // cambio el nombre de las imagenes por si llega a pasar de que existan dos repetidas
        const filename = `usrPic_${Date.now()}.${ext}`;
        callback(null, filename);
    }
});

const uploadPic = multer({ storage });

module.exports = uploadPic;