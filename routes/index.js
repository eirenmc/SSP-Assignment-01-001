var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Secret Keeper' });
});

router.get('/login', function(req, res, next){ 
   res.render('login.jade'); 
});

router.post('/login', function(req,res,next){
    var username = req.body.username;
    var password=req.body.password;
    console.log("User name = "+ username+" , paswword is "+ password);
    //res.end("yes");
    //res.render('secrets.jade');  
   // res.redirect('secrets.jade')  
   /* res.send('username: ', req.body.username);
*/
    if(username == "eiren" && password == "student"){
        res.redirect('secrets');
        res.render('secrets.jade');
    }
    else{
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
   res.render('secrets.jade'); 
});

router.get('/logout', function(req, res, next){
   res.redirect('/'); 
});

router.get('/wrongLogin', function(req, res, next){
   res.render('wrongLogin.jade'); 
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