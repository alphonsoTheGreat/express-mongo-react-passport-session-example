var express = require('express');
var router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var db = require('./../db/mongoose')




// middleware for fetching the user from db and check if password match 
passport.use(
    new LocalStrategy(
        {usernameField: "email",passwordField: 'password'},
        (email, password, done) => {
            db.get_user_by_email(email)
            .then(user => {
                if (!user) 
                    return done(null, false,{ message: 'bad password' });
                
                if (user.password != password) 
                    return done(null, false,{ message: 'bad password' });            
            
                return done(null, user);
            })
            .catch(err => done(err))
    }
));


// handle '/' GET request
router.get('/',(req,res,next) => {
    res.send(' log in page')
});


// handle logout GET request
router.get('/logout', (req,res,next) => {
    req.logout()
    res.status(200).send('success')

});


// handle login POST request
router.post('/login', passport.authenticate('local',
    {
        successRedirect: 'success',
        failureRedirect: 'error',
        passReqToCallback : true
    })
);


// check if the user have session and handle
router.get('/check', function(req, res, next) {
    if(req.user)
      res.status(200).send({user:req.user})
    else
      res.status(401).send('   must log in   ')
});

// handle post data about Thumbnail position
router.post('/thumb', (req, res,msg) => {
    let {x,y} = req.body
    db.set_thumbnailPos_by_id(x,y,req.user.user.id)
    .then(data => {
        res.status(200).send(data)
    })
    .catch(e => console.error(e))
});


// success & error re-direct after authenticate the user
router.get('/success', (req, res,next) => {
    res.status(200).send({user:req.user})
});
router.get('/error', (req, res,msg) => {
    res.status(401).send({msg:'not auth'})
});




// managing user session
passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
    // get the user from DB by id
  db.get_user_by_id(id)
  .then((user,err) => {
      // connect the user thumbnail to the user Object
      db.get_user_thumbnail(user.id)
        .then((userThumb) => {
            user = Object.assign({},{user},{thumb: userThumb})
            // attach the user & user thumbnail to the response
            cb(err,user)})

        })
  .catch(err => console.log('ERROR:', err))
});





module.exports = router;