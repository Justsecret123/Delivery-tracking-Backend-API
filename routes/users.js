//Setting up the router
const router = require("express").Router();
let User = require("../models/user.model");

//Body parsers
var bodyParser = require("body-parser");
const { isValidObjectId } = require("mongoose");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true}));

//Route: main 
router.get("/", (req,res)=> {
    res.status(200).json("Welcome to the main route :D");
});

//Route: User/:id
router.get('/user/:id', (req, res) => {

    //Parameters 
    let id = req.params.id;

    //Valid id formatting
    if(id !== null && isValidObjectId(id)){

        User.findById(id, (err, result) => {
            if(result!==null){
                res.status(200).json({message: "Success!", user: result});
            }else{
                res.status(450).json({message: "User not found!"})
            }
        }).catch(err => res.status(500).json({message: "Operation failed! " + err}));  

    }else{
        res.status(400).json({message: "Error: Bad request ID formatting!"});
    }

});

//Route login 
router.post("/login", (req,res)=> {

    //Parameters 
    let login = req.body.login;
    let password = req.body.password;

    if (typeof login !== "undefined" && typeof password !== "undefined"){
        User.findOne({login: login, password: password}, 
        (err,result)=>{
            if (result !== null){
                res.status(200).json({message: "Success!", userId: result._id});
            }else{
                res.status(450).json({message: "User not found!"});
            }
        }
        )
        //The server (MongoDB) could not process the request
        .catch(err => res.status(500).json({message: "Operation failed!" + err}));
    }else{
        res.status(400).json({message: "Invalid request body!"});
    }

});

//Route login 
router.post("/loginadmin", (req,res)=> {

    //Parameters 
    let login = req.body.login;
    let password = req.body.password;

    if (typeof login !== "undefined" && typeof password !== "undefined"){
        User.findOne({login: login, password: password}, 
        (err,result)=>{
            if (result !== null && result.is_admin){
                res.status(200).json({message: "Success!", user: result});
            }else{
                res.status(450).json({message: "User not found!"});
            }
        }
        )
        //The server (MongoDB) could not process the request
        .catch(err => res.status(500).json({message: "Operation failed!" + err}));
    }else{
        res.status(400).json({message: "Invalid request body!"});
    }

});

//Route: Add user
router.post('/subscribe', (req, res) => {
    
    //Parameters
    let adresse = req.body.adresse; 
    let email = req.body.email;
    let login = req.body.login;
    let password = req.body.password;
    let nom = req.body.nom; 
    let prenom = req.body.prenom; 
    let telephone = req.body.telephone; 

    //is_admin = false, since an administrator doesn't need to subscribe
    const newUser = new User (
        {
            is_admin: false,
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
                res.status(401).json({message: "Erreur: Le nom d'utilisateur est déjà pris.", id: null});
            }
        }
    });
    
});

//Route : delete a user
router.delete('/delete', (req,res)=>{

    //Parameters
    let id = req.body.id;

    //Operation
    User.deleteOne({"_id": id}, (err,result)=>{
        //"result" will be undefined if the server couldn't process the request
        if(typeof result !== "undefined"){
            if(result.deletedCount==1){
                res.status(200).json({message: "User deleted !"});
            }else{
                res.status(401).json({message: "An error occured: the user doesn't exist."});
            }
        }
    })
    //Bad id formatting or inacessible server
    .catch(err => res.status(400).json({message: "Operation failed: " + err}))
    
});

//Route : update user
router.patch('/update', (req,res)=>{

    //Parameters
    let id = req.body.id;
    let adresse = req.body.adresse; 
    let email = req.body.email;
    let login = req.body.login;
    let password = req.body.password;
    let nom = req.body.nom; 
    let prenom = req.body.prenom; 
    let telephone = req.body.telephone; 

    //Operation
    User.updateOne({_id: id}, 
        {$set:
            {
                adresse: adresse, 
                email: email, 
                login: login, 
                password: password, 
                nom: nom, 
                prenom: prenom, 
                telephone: telephone
            } 
        },
        (err,result)=>{
            //"result" will be undefined if the server couldn't process the request
            if(typeof result!=="undefined"){
                console.log("Result: ", result);
                if(result.n==1 && result.ok==1){
                    res.status(200).json({message: "Success ! "});
                }else{
                    res.status(401).json({message: "Something went wrong. User not found "});
                }
            }
        }
    )
    //Bad id formatting or inacessible server
    .catch(err => res.status(400).json({message: "Operation failed: " + err}))

});


module.exports = router;