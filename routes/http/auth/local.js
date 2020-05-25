const express = require('express');
const passport = require('passport');
const config = require('config');
const routes = express.Router();
const LocalStrategy = require('passport-local').Strategy;
const { saveProvide } = require('controllers/http/auth');
const multer = require('multer');
const upload = multer();

const User = require('models/user');

passport.use(new LocalStrategy(
    (username, password, cb) => {
        User.findOne(username, (err, user) => {
        if (err) { return cb(err); }
        if (!user) { return cb(null, false); }
        if (user.password != password) { return cb(null, false); }
        return cb(null, user);
      });
    }));


routes.post('/', upload.none(), passport.authenticate('local',
  {
    failureRedirect: '/login',
    successRedirect: '/dash' 
  }),
(req, res, next) => {
  res.render('wtf?');
});

module.exports = routes;
