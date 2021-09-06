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
        .catch((err)=> res.status(400).json({message: "Error:" + err}));    
    }else{
        res.status(450).json({message: "Invalid request body!"});
    }

});

module.exports = router;