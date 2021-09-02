//Setting up our server
const express = require('express');
const cors = require("cors");

//Setting up mongoose
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/suivi_livraison', {useNewUrlParser: true, useUnifiedTopology: true })
.catch(error => handleError(error));

//Connection and error handling
const connection  = mongoose.connection;

connection.once('open', () => {
    console.log("\nConnection succesful!\n\n");
})

connection.on('error', err => {
    console.log(err);
});

require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

//Dependecies
app.use(cors());
app.use(express.json());

//Defined routes

///User
const userRouter = require("../routes/users");
app.use("/users",userRouter);

///Order
const orderRouter = require("../routes/orders");
app.use("/orders",orderRouter);

///Delivery man
const deliveryRouter = require("../routes/deliveries");
app.use("/deliveries/", deliveryRouter);

//Test
const Delivery = require("../models/delivery.model");

///Generate a random order
const randomUserId = mongoose.Types.ObjectId();
const randomOrderId = mongoose.Types.ObjectId();
const randomDeliveryManId = mongoose.Types.ObjectId();
const date = "2021-05-18T16:00:00.000+00:00";
const newDelivery = new Delivery ( 
    {
        id_user: randomUserId, 
        id_order: randomOrderId, 
        id_delivery_man: randomDeliveryManId, 
        id_location: null, 
        delivery_date: date
    }
); 

newDelivery.save()
.then(() => console.log({message: "Delivery added !"}))
.catch(() => console.log({message: "Error: "}));


///Delivery man
const deliveryManRouter = require("../routes/deliverymen");
app.use("/deliveryMen/", deliveryManRouter);

//Starting the server
app.listen(port, () => {
    console.log(`Server is effectively running on port : ${port}`);
});