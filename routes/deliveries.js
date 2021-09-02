//Setting up the router
const router = require("express").Router();
let Delivery = require("../models/delivery.model");

//Body parsers
var bodyParser = require("body-parser");
const { isValidObjectId } = require("mongoose");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true}));

//Route: main 
router.get("/", (req,res)=> {
    res.status(200).json("Welcome to the main route :D");
});

module.exports = router;