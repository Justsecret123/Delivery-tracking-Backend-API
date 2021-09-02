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

///Delivery man
const deliveryManRouter = require("../routes/deliverymen");
app.use("/deliveryMen/", deliveryManRouter);

//Test
const DeliveryMan = require("../models/deliveryman.model");

///Generate a random delivery man
const randomEmail = (Math.random() + 1).toString(36).substring(3) + "@hotmail.com";
const randomFirstName = (Math.random() + 1).toString(36).substring(3);
const randomLastName = (Math.random() + 1).toString(36).substring(3);
const randomPhone = "+" +  (Math.random() + 1).toString(36).substring(3);
const dob = "1993-05-18T16:00:00.000+00:00";
const newDeliveryMan = new DeliveryMan ( 
    {
        email: randomEmail, 
        nom: randomFirstName, 
        prenom: randomLastName, 
        phone: randomPhone, 
        photo: null, 
        dob: dob
    }
); 

newDeliveryMan.save()
.then(() => console.log({message: "Delivery man added !"}))
.catch(() => console.log({message: "Error: "}));

//Starting the server
app.listen(port, () => {
    console.log(`Server is effectively running on port : ${port}`);
});