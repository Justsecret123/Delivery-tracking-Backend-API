const mongoose = require('mongoose');
mongoose.set('debug', true);

const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
        is_active: {
            type: Boolean, 
            required: true
        },
        id_user : {
            type: String, 
            required: true
        },
        delivery_fee: {
            type: Number
        },
        payment_method: {
            type: String, 
            enum: ["cash","card"]
        }, 
        photo: {
            type: String
        }, 
        order_date: {
            type: Date
        },
        processing_date: {
            type: Date
        },
        delivery_date: {
            type: Date
        }, 
        cancellation_date: {
            type: Date
        }
    },
    {collection: "orders"}
);

const Order = mongoose.model("Order", orderSchema, "orders");

module.exports = Order;