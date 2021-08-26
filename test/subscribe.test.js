//Setting up our server
const express = require('express');
const cors = require("cors");
const axios = require("axios");

//Setting up mongoose
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/suivi_livraison', {useNewUrlParser: true, useUnifiedTopology: true })
.catch(error => handleError(error));

//Connection and error handling
const connection  = mongoose.connection;

connection.once('open', () => {
    console.log("Connection succesful!");
})

connection.on('error', err => {
    logError(err);
});

require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

//Dependecies
app.use(cors());
app.use(express.json());

//Defined routes
const userRouter = require("../routes/users");
app.use("/users",userRouter);

//Correct test
const ibrahim_correct = {
    "is_admin": false,
    "adresse": "Adresse de Ibrahim M.SEROUIS", 
    "email": "ibrahimserouis99@hotmail.com", 
    "login": "IbrahimSerouis123456__", 
    "password": "chegbsxsqjjeje", 
    "nom": "Test"
}

//Incorrect test : missing login
const ibrahim_incorrect = {
    "is_admin": false,
    "adresse": "Adresse de Ibrahim M.SEROUIS", 
    "email": "ibrahimserouis99@hotmail.com", 
    "password": "chegbsxsq%20", 
    "nom": "Test"
}

//Starting the server
app.listen(port, () => {
    
    console.log(`Server is effectively running on port : ${port}`);
    console.log("-----Starting the test : SUBSCRIBE ---------\n");
    
    //Send the request to the server

    //Test 1 
    console.log("-----Test 1 : Correct case--------\n");
    axios.post("http://localhost:5000/users/subscribe",ibrahim_correct)
    .then(response => {console.log("\n\nResponse (test 1): " + response.data.message + " || ID: " + response.data.id);})
    .catch(error => {console.log("\n\nError (test 1): " + error);})

    //Test 2 
    console.log("-----Test 2 : Incorrect case (MISSING LOGIN)--------\n");
    axios.post("http://localhost:5000/users/subscribe",ibrahim_incorrect)
    .then(response => {console.log("\n\nResponse (test 2): " + response.data.message + "  || ID: " + response.data.id);})
    .catch(error => {console.log("\n\nError (test 2): " + error);})

});