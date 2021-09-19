const mongoose = require('mongoose');
mongoose.set('debug', true);

const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
        status: {
            type: String
        },
        id_user : {
            type: String, 
            required: true
        },
        id_deliveryman : {
            type: String
        },
        location : {
            latitude : {type: Number}, 
            longitude : {type: Number}
        },
        address : {
            type: String
        },
        delivery_fee: {
            type: Number
        },
        payment_method: {
            type: String, 
            enum: ["cash","card"]
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