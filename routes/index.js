var express = require('express');
var router = express.Router();

// Creating a Secret Array so that it can hold a number of objects aka secret entries.
// Each secret the user creates, will create an object that holds the message and assigns
// it an id, this object is then pushed into the array. I am using the array to hold all 
// the secrets and later loop through them to see which one I am selecting for deletion
var allSecretVault = [];

// This is a varible that I am incrementing, i am assigning to each object created and 
// increasing the number by 1. By increasing the number I am able to create unique ids as
// each one is different. If I were continuing with the sessions I would have switched 
// this from a number to a date and time
var secretCounter = 0;

// I am creating these varable to be able to store the values entered in the login form, if 
// the username and password match the pre-defined ones for the secret page, the user will 
// be able to access the user page but if they are incorrect the value is set back to nothing
// the user will be asked to try again. I am using these varaibles to check if I can give the 
// user access or not to the secrets page
var username;
var password;


///////////////////////////////////////////////////////////////////////////////////////////////

// Here are the Mongo requireing in order to get mongoDB to work, I am also making the url 
// variable equal the either the set connection string from MongoDB or use the local host
var mongoClient = require('mongodb').MongoClient;
var url = process.env.CUSTOMCONNSTR_MongoDB || 'mongodb://localhost:27017/secretVaultData'; 

///////////////////////////////////////////////////////////////////////////////////////////////


/* GET home page.*/
// If the user goes to a the page with just a / at the end of the url, it will default to the
// index page, this is to ensure that the user doesn't end up in the secrets pae or somewhere else
router.get('/', function(req, res, next) {
    
    // Setting the username to blank, whenever the user goes to the homepage, therefore someone 
    // who logged in, cant just log out and then type in the url to go the the secrets page. As
    // the username is now blank, and not holding the pre-defined credentials it means that the
    // next user isn't able to just jump straight to the secrets but must enter the login details
  username = "";
  
  //Rending the index age and giving it a title of Secret Vault. By having the title specified
  // like this, it means I dont have to edit jade or individual pages what their titles are but
  // I can make all the titles on the index.js, this means I only need to change them if needed
  // in one place. I am doing it like this to stop having to hard code the title into each page
  // but instead keep order of them on the index.js
  res.render('index', { title: 'Secret Vault' });
});

/*------------------ Login Page ----------------------*/

// if the server receives a request for /login, it will call the following fuction. This function
// is only run by a get request. if the server recieves the get request, it will do something such
// as rendering the login page. I created this get request handler as I need something to occur if
// the user clicks on something that looks for the /login, an example of this in on the homepage 
// where this request is most likely to occur where the button holds a link to the login, so therefore
// I need to load the login page for the user
router.get('/login', function(req, res, next){ 
    
    username = "";
    password = "";
    
    // This line is rendering the login page, as the user is requesting, I need to direct them to it, 
    // again I am also using a dynmaic page title so I only need to change on the index.js and not 
    // search through pages looking for the right one 
    res.render('login.jade', { title: 'Secret Login' }); 
});

// This is dealing with a post request from the login page. I am using this to handle the details
// entered on the login form, by having a post request I am able to see the username and password
// the user used but in such a way that no else can see the details entered like a get request
router.post('/login', function(req,res,next){
    
    // This is used to allow me to get the values of login in forms fields username and password. By 
    // getting these and storing them in a variable I am able to test and see do they hold the correct
    // pre-defined login details
     
     username = req.body.username;
     password = req.body.password;
     
    //I am consoling out the username and password entered, this was for test purposes to see were the
    // contents of the variable above correct or not, it tells me what was entered.    
     console.log("User name = "+ username+" , pasword is "+ password);
 
    // I am checking if the username is the pre-defined username and if the password is the pre-defined
    // password. And only then if they are I want the broswer to go to the secrets page but if not, send
    // the user to the wrongLogin page. I am doing this to ensure that only the correct details will allow
    // someone access to the secrets page, otherwise do not give them access, this is a safety measure and
    // ensure only those with the login can actually see the secrets page
    if(username == "eiren" && password == "student"){     

        // If the details entered were what they were pre-defined this line will execute. As I need to send 
        //the user to the secrets page,I am redirecting them to the page to allow them the access         
        res.redirect('secrets');
    }
    else{
        // If the details entered were not what they were pre-defined this line will execute. I am making the username
        // and password equal nothing as they were incorrect, there is no need to store them now. So the next time the
        // user goes to try to login the variables are empty and then replaced once the login form has been submitted
        username = "";
        password = "";
        
        // As the details weren't correct I need to send the user to the secrets page, I am redirecting them 
        // to the page to the wrongLogin page as they dont have access 
        res.redirect('wrongLogin');
    }
});

/*------------------ Registration Page ----------------------*/

// If the server receives a request for /registration, it will call the following fuction. This function
// is only run by a get request for the registration page. If the server recieves the get request, it will do render
// the regstration page. I created this get request handler as I need something to occur if user clicks registration
router.get('/register', function(req, res, next){

    // This line is rendering the registration page, as the user is requesting it, I need to direct them to it, 
    // I am also using a dynmaic page title so I only need to change on the index.js and not search through pages
    // looking for the right one 
    res.render('register.jade', { title: 'Secret Vault Registration' }); 
});

// This is dealing with a post request from the registration page. I am using this to handle the details
// entered on the registration form, by having a post request I am able to see securely pass on the name,
// username, email and password the user used. My main use for this post request is for a user account database and sessions
router.post('/register', function(req, res, next){

    // using express to send the data entered into the form and show what the user is sending in a JSON object
   res.json(req.body);
});

/*------------------Secrets Page -----------------------*/

router.get('/secrets', function(req, res, next){
    // I used this loop to loop through each object in the array and console out the secret message of each, I 
    // used this for testing purposes to ensure that the secret message were storing correctly and that they 
    //were in fact hold onto a message    
    
   /* for(var i = 0; i < allSecretVault.length; i++){
        console.log(allSecretVault[i].secretMessage);
    }*/
    
    // When on the secrets page, I need to make sure that the user did in fact login and not not just go to the
    // secrets page. To do this, I am using the username and password variables again. If the user logged in then
    // the variables username and password would hold the pre-defined username and password, so getting onto the secrets
    // should be ok as the variables are holding the right values but for example someone didn't login or went directly
    // to the secrets page, the varaibles are empty so they wouldnt hold any values thus the if statement can't execute
    // and the user is re-directed back to the login page.
    if(username == "eiren" && password == "student"){ 
        
        // I am console logging out the username just to ensure that 'eiren' is being passed through and that it is the stored value
        console.log("the correct username is: " + username);
        
        // This line is rendering the secrets page, as the user is requesting, I need to direct them to it. I am also trying
        // to access the secrets in the array seccret vault in order to be able to display them on the page
        res.render('secrets.jade', {secrets: allSecretVault});
    }
    else{
        //For testing purposes, I am console logging the username, so I can make sure that the username is not eiren
        console.log("the wrong username is: " + username);
        // As the username is not eiren, I don't want the user to go the secrets page, so I am directing them to an alternative page
        res.redirect('/wrongAccess');
    }
});

// If there is a get request for wrongAccess, call the function, and render the wrongAccess page and gives the page a title
// of Wrong Access Point. I am doing this to handle the get request, the reason why I need a wrongAccess page and direct users
// to it is because they are trying to access the secret page without logging in first. Because I dont want them going to the
// secret page I need to direct them, so this directing is to inform the user this way  
router.get('/wrongAccess', function(req, res, next){
   res.render('wrongAccess.jade', {title: 'Wrong Entry Point'}); 
});


router.get('/secrets', function(req, res, next){

  //res.render('secrets.jade', {secrets:allSecretVault});
  //res.json(req.body); 
  
   ////////////////////////////////////////////////////////////
   console.log("please work");
    mongoClient.connect(url, function(err, conn) {
       if (err) {
           console.log(err);
           throw err;
       } else {
           var cursor = conn.collection('secrets').find();
           cursor.toArray(function(err, docs){
              res.render('secrets', {secret: docs}); 
           });
       }
    });
   //////////////////////////////////////////////////////////// 
});


//This is for dealing with a new post request for secrets
router.post('/secrets', function(req, res, next){

    // These next few lines of code are creating a secret object that will have a number 
    // of properties such as the secret message the user typed and a unique id that is being assigned.
    // This object will be pushed into an array and displayed on the secret page. 

    // I am creating an empty object as I want to assign a number of different properties. Each object 
    // gets two properties, one is the id, this is a number being assigned to it from a variable I 
    // declared at the beginning - secretCounter, and the other is the secretMessage. The secretMessage
    // gets its value from the text in the input field addSecretText. I am taking this text and storing
    // it in the secretMessage property.
    
    // As each object will later be added into the allSecretVault array, that I will loop through to display
    // each secret or if any need to be deleted
    
    // A secret entry onto the secret page does not occur until it has been pushed into the array and the page is
    //'reloaded' but unaware to the user, to show the newest and old secrets
    var secret = {};
    
 /* -- */
   // secret.id = secretCounter;
/* -- */
   
    secret.secretMessage = req.body.addSecretText;
    
    //I am increasing the secretCounter as it is acting as ids for each object. By increasing this number after
    // each object is made, this ensures that each object has a unqiue id
///////////
/**/
  //  secretCounter++;
  //  console.log(secretCounter);

//////////    
    // Here I am pushing the objects into the array, so I can loop through them   
    allSecretVault.push(secret);
    
    mongoClient.connect(url, function(err, conn) {
        if(err){
            console.log(err);
            throw err;
        } else {
            conn.collection('secret').insertOne(secret, function(err, result){
                // This callback is going to get called by the insertOne function
                // when either the insertion has been successful or not.
                if (err) {
                    console.log(err);
                    throw err;
                }
                else {
                    console.log("Insertion complete");
                    conn.close();
                }
            });
            
            // Notice that I render the index page without even waiting for the db to say that 
            // it has inserted the document
            res.render('secrets', { title: 'Secret Vault' });
        }
    });
    
   // req.session.allSecretVault.push(secret);
    
    // Once a secret has been pushed in the array, I am reloading the secrets page, so that
    // it 'refreshes' but occurs in the background and the user is unaware and the secrets
    // have updated and are added to the page for the user to see
///////////   
/* */  
    res.redirect('/secrets');

///////////    
});

// This function deals with the deletion of a secret. This will run when a post request for 
// deleteme is sent. I am looping through the array so I can pick out the secret object that
// has been selected by the user. The delete works through a delete button, the delete button
// is created when the secret li is being created in the jade (see secrets.jade), this delete
// I am creating a hidden input field that holds the id of the secret. Using this is I am 
// checking if the delete button of a particular secret (holding the secrets id) matches with 
// an id of the array, and finding that id its related to and removing the object from the array
router.post('/deleteme', function(req, res, next){
    for(var j = 0; j < allSecretVault.length; j++){
        if(req.body.id == allSecretVault[j].id){
            allSecretVault.splice(j, 1);
        }
    }
    //Once a secret has been deleted, I am directing the user back to the secrets page, this is
    // acting as a 'refresh' of the page, which the user is unaware of, so I can update the contents
    // of the array now that an object has been removed.
    res.redirect("/secrets");
});


// This is a get request for logout, this only occurs when the user clicks on the logout
// button on the secrets page as the user is ready to leave the secret vault
router.get('/logout', function(req, res, next){
    // As the user is logging out, I want the username and password to be empty again, once
    // they leave, this way if they change to a different page on the web application and
    // go back to secrets via the url, they should be logged out as they have 'logged out'    
    username = "";
    password = "";
    //As I am logging out the user, I need somewhere to send them to, So I direct the user to
    // the index page as it is the most logical place for a user to be placed once they are logged out
    res.redirect('/'); 
});

// This function will only run when a get request for wrongLogin occurs, the only place this occurs
// Is on the login page. If the user puts in the wrong details they are directed to this page. In order 
// to handle this, this function will display the wrong login page to the user. This function also deals
// with assigning a title that is controlled in the index.js not the individual page
router.get('/wrongLogin', function(req, res, next){
   res.render('wrongLogin.jade', {title: 'Wrong Login'}); 
});


module.exports = router;
