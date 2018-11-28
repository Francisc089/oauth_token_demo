const router = require('express').Router()
const passport = require('passport')
const { User } = require('../db')
const jwt = require('jwt-simple')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
module.exports = router

router.get('/', passport.authenticate('google', { scope : 'email' }));

router.get('/callback',
passport.authenticate('google', { session : false, failureRedirect : '/login' }), (req, res) => {
  var token = req.user.token;
  res.redirect('/?token=' + token)
});


const googleCredentials = {
  clientID: 'your-client-id',
  clientSecret: 'your-client-key',
  callbackURL: '/api/google/callback',
  state : false
};

const verificationCallback = (accessToken, refreshToken, profile, done) => {
  //console.log('callback profile: ', profile)
  const info = {
    name : profile.displayName,
    password : 'oAuth',
    accessToken : accessToken
  };
  User.findOrCreate({
    where : { googleId : profile.id },
    defaults : info
  })
  .then(user => {
    //console.log('accessToken: ', accessToken)
    //console.log('callback USER : ', user)
    const userObj = user[0].dataValues;
    const token = jwt.encode({ id : userObj.id }, process.env.JWT_SECRET );
    const userData = { token : token };
    done(null, userData);
  })
};

const strategy = new GoogleStrategy(googleCredentials, verificationCallback);

passport.use(strategy);


passport.serializeUser(function(user, done) {
  done(null, user);
 });
 passport.deserializeUser(function(user, done) {
  done(null, user);
 });
