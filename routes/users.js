//Setting up the router
const router = require("express").Router();
let User = require("../models/user.model");

//Body parsers
var bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true}));

//Route: main 
router.get("/", (req,res)=> {
    res.status(200).json("Welcome to the main route :D");
});

//Route: Add user
router.post('/subscribe', (req, res) => {
    
    //Parameters
    let is_admin = Boolean(req.body.is_admin); 
    let adresse = req.body.adresse; 
    let email = req.body.email;
    let login = req.body.login;
    let password = req.body.password;
    let nom = req.body.nom; 
    let prenom = req.body.prenom; 
    let telephone = req.body.telephone; 

    const newUser = new User (
        {
            is_admin: is_admin, 
            adresse: adresse, 
            email: email, 
            login: login, 
            password: password, 
            nom: nom, 
            prenom: prenom, 
            telephone: telephone   
        }
    );

    //Var id = null
    var id = 0;

    //Check if the login is already taken
    const userExists =  User.countDocuments({"login":login}, 
    (err,count) =>  {
        if(err){
            console.log("Erreur: " + err);
        }else{
            if(count<1){
                //The login is available : create user
                newUser.save()
                .then(() => res.status(200).json({message: "User added !", id: newUser._id}))
                .catch(err => res.status(400).json({message: "Error: " + err, id: null}));
            }else{
                res.status(401).json("Erreur: Le nom d'utilisateur est déjà pris. ");
            }
        }
    });
    
});

module.exports = router;