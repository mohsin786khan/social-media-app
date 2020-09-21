const passport=require('passport');
const localStrategy=require('passport-local').Strategy;
const User=require('../models/user');

//authentication using passport

passport.use(new localStrategy({
usernameField:'email'
},
function(email,password,done){
    //find the user and establish the identity
   User.findOne({email:email},function(err,user){
       if(err){
           console.log('error in finding user --> passport');
           return done(err);
       }

      if(!user || user.password!=password){
          console.log('invalid username/password');
          return done(null,false);
      }

       return done(null,user);

   });
}

));


passport.serializeUser(function(user,done){
 done(null,user.id);
});


passport.deserializeUser(function(id,done){
User.findById(id,function(err,user){
if(err)
{
    console.log('error in finding user --> passport');
    return done(err);
}
  return done(null,user);
});
});


// check if the user is authenticated

passport.checkAuthentication=function(req,res,next){
// if the user is signed in, then pass on the request to the next function(controll's function)
    if(req.isAuthenticated()){
        return next();
    }

    // if the user is not signed
    return res.redirect('/user/sign-in');
}

passport.setAuthenticatedUser=function(req,res,next){
    // res.user contains current signed in user from the session cookie
    // and just sending this to the locals for the views
    if(req.isAuthenticated()){
     res.locals.user=req.user;        
    }
    next();
}
module.exports=passport;
