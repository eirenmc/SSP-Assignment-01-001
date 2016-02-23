var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Secret Keeper' });
});

//Rendering the index page
router.get('index', function(req,res,next){
   res.render('index'); 
});

/*
  Deals with a post event from the index page and
  if the username is Eiren and the password is student
  then it s suppose to change to the secrets page, 
  currently not doing this
*/
router.post('/index', function(req, res, next){
    if(req.body.username == "Eiren" && req.body.password == "student"){
        res.redirect("/secretsPage");
    }
    //Otherwise render the index page
    else{
        res.redirect("/index");
    }
});


module.exports = router;

