const mongoose = require('mongoose');

//Mongo DB Schema, Creo el esquema de como van a ser mis usuarios aqui!! (el molde)
const userSchema = mongoose.Schema({
    fullName: { type: String, require: true },
    userName: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    profilePic: { type: String, default: "" },
    password: { type: String, require: true }
    // Podriamo tener lo siguiente si queremos conservar los datos de la persona y que paresca que se borro, un booleano que cuando borra lo paso a false
    // isActive: { true }
},
    {
        timestamps: true, // agrega los campos createAt y updateAt
    }
);

// ocultar pra que no se vea (al menos en postman)
userSchema.set("toJSON", {
    transform(doc, ret) {
        ret.id = ret._id;
        delete ret.__v;
        delete ret.password;
        delete ret._id;
    }
});

// Mongo DB model, me permite interactuar con mis datos, un modelo que se basa en un esquema (el creado arriba). Primero el nombre del modelo luego el esquema basado
const User = mongoose.model("User", userSchema);

// Exporto el modelo
module.exports = User;

