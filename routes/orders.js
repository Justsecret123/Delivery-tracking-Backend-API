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

//Route : id
router.get("/order/:id", (req,res)=> {

    //Parameters
    let id = req.params.id; 

    //Valid id formatting
    if(id!==null && isValidObjectId(id)){
        Order.findById(id,(err,result) => {
            if(result!==null){
                res.status(200).json({message: "Success!", order: result});
            }else{
                res.status(450).json({message: "Order not found!"});
            }
        }).catch(err => res.status(500).json({message: "Operation failed! " + err}));

    }else{
        res.status(400).json({message: "Bad request id formatting!"});
    }

});

//Route: Get all orders
router.get("/list/all", (req,res)=> {

    Order.find((err,result)=>{
        res.status(200).json({message: "Success!", orders: result});
    })
    .catch(err => res.status(400).json({message: "An error occured: " + err}));
});

//Route : delete a user
router.delete('/delete', (req,res)=>{

    //Parameters
    let id = req.body.id;

    //Operation
    Order.deleteOne({"_id": id}, (err,result)=>{
        //"result" will be undefined if the server couldn't process the request
        if(typeof result !== "undefined"){
            if(result.deletedCount==1){
                res.status(200).json({message: "Order deleted !"});
            }else{
                res.status(450).json({message: "An error occured: the order doesn't exist."});
            }
        }
    })
    //Bad id formatting or inacessible server
    .catch(err => res.status(400).json({message: "Operation failed: " + err}))
    
});



module.exports = router;