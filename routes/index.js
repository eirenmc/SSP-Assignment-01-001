var express = require('express');
var router = express.Router();

//Secret Array that will hold each secret
var allSecretVault = [];
var secretCounter = 0;

var getSecretIndex = function(secretId){
    var secretIndex = -1;
    
    for(var i=0; i < allSecretVault.length; i++){
        console.log("Checking the id no: " + allSecretVault[i].id + "against: " + secretId);
        if(allSecretVault[i].id == secretId){
            secretIndex = i;
        }
    }
    return secretIndex;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Secret Keeper' });
});

router.get('/login', function(req, res, next){ 
   res.render('login.jade'); 
});

router.post('/login', function(req,res,next){
    
     var username = req.body.username;
     var password = req.body.password;
    
     console.log("User name = "+ username+" , pasword is "+ password);
    //res.end("yes");
    //res.render('secrets.jade');  
   // res.redirect('secrets.jade')  
   /* res.send('username: ', req.body.username);
*/
    if(req.body.username == "eiren" && req.body.password == "student"){
       
        
       // req.session.username = username;
       // req.session.password = password;
        
        res.redirect('secrets');
        res.render('secrets.jade');
    }
    else{
        res.redirect('wrongLogin');
        res.render('wrongLogin.jade');
    }
});

router.get('/register', function(req, res, next){
   res.render('register.jade'); 
});

router.post('/register', function(req, res, next){
   //using express to send the data entered into the form and show what the user is sending
   res.json(req.body);
});

router.get('/secrets', function(req, res, next){
    for(var i = 0; i < allSecretVault.length; i++){
        console.log(allSecretVault[i].secret);
    }
   res.render('secrets.jade', {secrets: allSecretVault}); 
});
/*
router.get('/secrets', function(req, res, next){
   res.render('secrets.jade', {secrets:allSecretVault}); 
});*/



//Dealing with a new secreet being created
router.post('/secrets', function(req, res, next){
    //console.log(secretCounter);
    //Creating a secret object that has the following properties
    var secret = {};
    //secret.id = eq.session.secretCounter++;
    secret.id = secretCounter;
    secret.secret = req.body.addSecretText;
    secretCounter++;
    console.log(secretCounter);
   
    allSecretVault.push(secret);
    //Pushing the newly created secret into the secret array
    //req.session.allSecretVault.push(secret);
    res.redirect('/secrets');
});


router.get('/logout', function(req, res, next){
   res.redirect('/'); 
});

router.get('/wrongLogin', function(req, res, next){
   res.render('wrongLogin.jade'); 
});


module.exports = router;

///////////////////////////////
/*
module.exports = {
    all: function(res,req){
        res.send('All secrets');
    },
    viewOne:function(res,req){
        console.log('Viewing '+ req.params.id);
    },
    create:function(res,req){
        console.log('Secret created');
    },
    destroy:function(req, res){
        console.log('Secret deleted');
    },
    edit:function(req,res){
        console.log('Secrets '+req.params.id + ' updated')
    }
};*/