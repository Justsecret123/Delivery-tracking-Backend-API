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
    logError(err);
});

require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

//Dependecies
app.use(cors());
app.use(express.json());

//Defined routes
const userRouter = require("./routes/users");
app.use("/users",userRouter);

//Starting the server
app.listen(port, () => {
    console.log(`Server is effectively running on port : ${port}`);
});