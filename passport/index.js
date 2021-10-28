const passport = require('passport');
const local = require('./localStrategy');
const db = require('../config/db');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.email);
  });
  passport.deserializeUser((email, done) => {
    db.query(`SELECT * FROM users WHERE userEmail="${email}"`, function (err, user) {
      if (user) {
        done(null, user)
      } else {
        done(err)
      }
    })
  });
  local();
};