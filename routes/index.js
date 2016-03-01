var express = require('express');
var router = express.Router();

// Creating a Secret Array so that it can hold a number of objects aka secret entries.
// Each secret the user creates will create an object that holds the message and assign
// it an id, this object is then pushed into the array
var allSecretVault = [];
var secretCounter = 0;

var username;
var password;

/* GET home page. */
router.get('/', function(req, res, next) {
  username = "";
  res.render('index', { title: 'Secret Keeper' });
});

/*------------------ Login Page ----------------------*/

router.get('/login', function(req, res, next){ 
   res.render('login.jade'); 
});

router.post('/login', function(req,res,next){
    
     username = req.body.username;
     password = req.body.password;
    
     console.log("User name = "+ username+" , pasword is "+ password);
    //res.end("yes");
    //res.render('secrets.jade');  
   // res.redirect('secrets.jade')  
   /* res.send('username: ', req.body.username);
*/
    if(req.body.username == "eiren" && req.body.password == "student"){     
        res.redirect('secrets');
    }
    else{
        res.redirect('wrongLogin');
    }
});

/*------------------ Registration Page ----------------------*/

router.get('/register', function(req, res, next){
   res.render('register.jade'); 
});

router.post('/register', function(req, res, next){
   //using express to send the data entered into the form and show what the user is sending
   res.json(req.body);
});

/*------------------Secrets Page -----------------------*/

router.get('/secrets', function(req, res, next){
    /*
    for(var i = 0; i < allSecretVault.length; i++){
        console.log(allSecretVault[i].secret);
    }
    */
    if(username == "eiren" && password == "student"){     
        console.log("the correct username is: " + username);
        res.render('secrets.jade', {secrets: allSecretVault});
    }
    else{
        console.log("the wrong username is: " + username);
        res.redirect('wrongLogin');
    }
    
    
  /* console.log("the username is: " + username);
   res.render('secrets.jade', {secrets: allSecretVault}); */
});

router.get('/secrets', function(req, res, next){
   res.render('secrets.jade', {secrets:allSecretVault}); 
});


//Dealing with a new secreet being created
router.post('/secrets', function(req, res, next){
    //console.log(secretCounter);
    //Creating a secret object that has the following properties
    var secret = {};
    //secret.id = eq.session.secretCounter++;
    secret.id = secretCounter;
    secret.secretMessage = req.body.addSecretText;
    secretCounter++;
    console.log(secretCounter);
      
    allSecretVault.push(secret);
    //Pushing the newly created secret into the secret array
    //req.session.allSecretVault.push(secret);
    res.redirect('/secrets');
});

router.post('/deleteme', function(req, res, next){
    for(var j = 0; j < allSecretVault.length; j++){
        if(req.body.id == allSecretVault[j].id){
            allSecretVault.splice(j, 1);
        }
    }
    res.redirect("/secrets");
});


router.get('/logout', function(req, res, next){
    username = "";
    password = "";
   res.redirect('/'); 
});

router.get('/wrongLogin', function(req, res, next){
   res.render('wrongLogin.jade'); 
});


module.exports = router;
