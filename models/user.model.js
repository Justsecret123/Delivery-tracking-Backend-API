const mongoose = require('mongoose');
mongoose.set('debug', true);

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        is_admin: {
            type: Boolean,
            required: true
        },  
        adresse: {
            type: String
        }, 
        email: { 
            type: String
        },
        login: {
            type: String, 
            required: true, 
            index: true,
            unique: true
        },
        password: {
            type: String, 
            required: true
        }, 
        nom: {
            type: String
        },
        prenom: {
            type: String
        },
        telephone: {
            type: String
        }
    },
    {collection: "users"}
);

const User = mongoose.model("User", userSchema, "users");

module.exports = User;