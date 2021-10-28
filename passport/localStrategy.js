const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const db = require('../config/db');

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    // session: true, // 세션에 저장 여부
    // passReqToCallback: false,
  }, async (email, password, done) => {
    try {
      const hashPassword = crypto.createHash('sha512').update(password).digest('base64')
      db.query(`SELECT * FROM users WHERE userEmail="${email}" && where="${hashPassword}"`,await function(err,user){
        if(user){
          done(null, user)
        } else{
          done(null, false, { message: '비밀번호가 일치하지 않거나 가입이 되지 않았습니다.'})
        }
      })
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};