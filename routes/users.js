var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/*router.post('/login', function(req, res, next){
   /* if(req.body.username == "Eiren" && req.body.password == "CreativeMutlimedia"){
        req.redirect("/secretsPage", );
    }*/
   // res.send('Hello world');
//}


module.exports = router;
