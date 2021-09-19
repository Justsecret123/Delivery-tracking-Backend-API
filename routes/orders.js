//Setting up the router
const router = require("express").Router();
let Order = require("../models/order.model");

//Body parsers
var bodyParser = require("body-parser");
const { isValidObjectId } = require("mongoose");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true}));

//Route: main 
router.get("/", (req,res)=> {
    res.status(200).json("Welcome to the main route :D");
});

//Route: Get all orders
router.get("/list", (req,res)=> {
    res.status(200).json("Welcome to the main route :D");

    Order.find((err,result)=>{
        res.status(200).json({message: "Success!", orders: result});
    })
    .catch(err => res.status(400).json({message: "An error occured: " + err}));
});

module.exports = router;