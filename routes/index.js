var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Secret Keeper' });
});

router.post('/login', function(req, res, next){
    if(req.body.username == "Eiren" && req.body.password == "student"){
        res.redirect("/secretsPage");
    }
    else{
        res.redirect("/index");
    }
});


module.exports = router;

