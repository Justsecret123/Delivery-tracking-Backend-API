//Setting up the router
const router = require("express").Router();
let DeliveryMan = require("../models/deliveryman.model");

//Body parsers
var bodyParser = require("body-parser");
const { isValidObjectId } = require("mongoose");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true}));

//Route: main 
router.get("/", (req,res)=> {
    res.status(200).json("Welcome to the main route :D");
});

//Route: get all deliverymen 
router.get("/list", (req,res)=> {

    DeliveryMan.find((err,result)=>{
        res.status(200).json({message: "Success!", deliveryMen: result});
    }).catch(err => res.status(400).json({message: "An error occured: " + err}));
    
});

//Route: id 
router.get("/:id", (req,res)=> {

    //Parameters
    let id = req.params.id; 

    //Valid id formatting
    if(id!==null && isValidObjectId(id)){
        DeliveryMan.findById(id,(err,result) => {
            if(result!==null){
                res.status(200).json({message: "Success!", deliveryMan: result});
            }else{
                res.status(450).json({message: "User not found!"});
            }
        }).catch(err => res.status(500).json({message: "Operation failed! " + err}));

    }else{
        res.status(400).json({message: "Bad request id formatting!"});
    }

});

//Route: Add delivery man
router.post('/add', (req, res) => {
    
    //Parameters
    let email = req.body.email; 
    let nom = req.body.nom;
    let prenom = req.body.prenom;
    let phone = req.body.phone;
    let photo = req.body.photo;
    let dob = (req.body.dob==null)? null:req.body.dob;

    //is_admin = false, since an administrator doesn't need to subscribe
    const newDeliveryMan = new DeliveryMan (
        { 
            email: email,  
            nom: nom, 
            prenom: prenom, 
            phone: phone, 
            photo: photo, 
            dob: dob
        }
    );

    if(typeof nom!=="undefined" && typeof email!=="undefined"){
        newDeliveryMan.save()
        .then(()=> res.status(200).json({message: "Delivery man added !", deliveryMan: newDeliveryMan}))
        .catch((err)=> res.status(400).json({message: "Error: " + err}));    
    }else{
        res.status(450).json({message: "Invalid request body!"});
    }

});

//Route : delete a user
router.delete('/delete', (req,res)=>{

    //Parameters
    let id = req.body.id;

    //Operation
    DeliveryMan.deleteOne({"_id": id}, (err,result)=>{
        //"result" will be undefined if the server couldn't process the request
        if(typeof result !== "undefined"){
            if(result.deletedCount==1){
                res.status(200).json({message: "Delivery man deleted !"});
            }else{
                res.status(450).json({message: "An error occured: the delivery man doesn't exist."});
            }
        }
    })
    //Bad id formatting or inacessible server
    .catch(err => res.status(400).json({message: "Operation failed: " + err}))
    
});

module.exports = router;