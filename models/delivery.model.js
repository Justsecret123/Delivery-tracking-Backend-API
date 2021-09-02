const mongoose = require('mongoose');
mongoose.set('debug', true);

const Schema = mongoose.Schema;

const deliverySchema = new Schema(
    {
        id_user: { 
            type: String, 
            required: true
        },
        id_order: {
            type: String, 
            required: true
        },
        id_delivery_man: {
            type: String
        },
        id_location: {
            type: String
        }, 
        delivery_date: {
            type: Date
        }
    },
    {collection: "deliveries"}
);

const Delivery = mongoose.model("Delivery", deliverySchema, "deliveries");

module.exports = Delivery;