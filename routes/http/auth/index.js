const express = require('express');
const routes = express.Router();

const github = require('./github');
const local = require('./local');
const passport = require('passport');
const userModel = require('models/user');

passport.serializeUser((id, cb) => {
  userModel.findOne({ id }, (err, user) => {
    cb(err, user);
  });
});

passport.deserializeUser((id, cb) => {
  userModel.findOne({ id }, (err, user) => {
    cb(err, user);
  });
});

/* Пул стратегий */
routes.use('/local', local);
routes.use('/github', github);


routes.all('/login', (req, res, next) => {
  res.render('login');
});
routes.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/login');
});

module.exports = routes;