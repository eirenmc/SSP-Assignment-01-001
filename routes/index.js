var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Secret Keeper' });
});

router.get('/login', function(req, res, next){
   console.log("running?");  
   res.render('login.jade'); 
});


router.get('/register', function(req, res, next){
   res.render('register.jade'); 
});
/*
//Rendering the index page
router.get('/index', function(req,res,next){
   //problem is with the content, the router get is working but the inside of
   //this function is not.....
   res.redirect('.index');
   res.render('/index', { title: 'Secret Keeper' }); 
   console.log("rendering index");
});*/

/*  Deals with a post event from the index page and
  if the username is Eiren and the password is student
  then it s suppose to change to the secrets page, 
  currently not doing this
*/
//router.post('/index', function(req, res){
    //this is also working except the content but it cant be calling it correctly (the function)
    //as the console is not running
   // console.log("failed");
   /* if(req.body.username == "eiren" && req.body.password == "student"){
        res.redirect("/login");
        res.render('login', { title: 'Secret Keeper' })
        console.log(req.body.username);
    }
    //Otherwise render the index page
    else{
        //console.log("failed");
    }*/
//});
//console.log("why");

module.exports = router;