const express = require('express');
const passport = require('passport');
const config = require('config');
const routes = express.Router();
const GitHubStrategy = require('passport-github').Strategy;
const { saveProvide } = require('controllers/http/auth');


const User = require('models/user');

passport.use(new GitHubStrategy({
  clientID: config.get('auth:strategies:github:GITHUB_CLIENT_ID'),
  clientSecret: config.get('auth:strategies:github:GITHUB_CLIENT_SECRET'),
  callbackURL: config.get('auth:strategies:github:callbackURL'),
},
(accessToken, refreshToken, profile, done) => {
  User.findOne({
    providerUserId: profile.id,
  }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      user = new User({
        name: profile.username,
        providerUserId: profile.id,
      });
      user.save(async (err) => {
        const userId = user._id;
        const strategies = config.get('auth:strategies:github:strategies');
        await saveProvide(strategies, profile, userId);
        if (err) console.log(err);
        return done(err, user);
      });
    } else {
      return done(err, user);
    }
  });
},
));


/* Линк на авторизацию через Гит  */
routes.all('/', passport.authenticate('github'));

/* калбек юрл  */
routes.all('/callback', passport.authenticate('github',
  {
    successRedirect: '/dash',
    failureRedirect: '/failure',
  }),
(req, res) => {
  // res.redirect('/ok');
  res.send('ok');
});

passport.serializeUser((user, cb) => {
  cb(null, user);
});
  
passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

module.exports = routes;
