const passport=require('passport');
const JWTStrategy=require('passport-jwt').Strategy;
const ExtractJWT=require('passport-jwt').ExtractJwt;

const User=require('../models/user');

var opts={
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:'codial'
}

passport.use(new JWTStrategy(opts, function(JWTpayload,done){
    User.findById(JWTpayload._id,function(err,user){
  if(err)
  {
      console.log('error in finding user from JWT');
      return;
  }

    if(user){
        return done(null, user);
    }else{
        return done(null,false);
    }
    });
}));

module.exports=passport;