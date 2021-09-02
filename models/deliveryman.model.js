const mongoose = require('mongoose');
mongoose.set('debug', true);

const Schema = mongoose.Schema;

const deliverymanSchema = new Schema(
    {
        email: { 
            type: String
        },
        nom: {
            type: String
        },
        prenom: {
            type: String
        },
        phone: {
            type: String
        }, 
        photo: {
            type: String
        }, 
        dob: {
            type: Date
        }
    },
    {collection: "deliverymen"}
);

const DeliveryMan = mongoose.model("Deliveryman", deliverymanSchema, "deliverymen");

module.exports = DeliveryMan;