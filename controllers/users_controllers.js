
const User=require('../models/user');

module.exports.profile=function(req,res){
console.log(req.cookies.user_id);
console.log(req.cookies);    
   if(req.cookies.user_id)
   {
       User.findById(req.cookies.user_id,function(err,user){
        if(user)
       {
           res.render('user_profile',{
            title:"user profile",
            user:user  
           });
       }
       
    else{
      return res.redirect('/user/sign-in');
    }
       });      
   }
   else{
       return res.redirect('user/sign-in');
   }
}


//render sign up page action

module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
    title:"codial | sign Up"
    });
}

//sign in page action
module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{
    title:"codial | sign In"
    });
}


//get the sign up data of user
module.exports.create=function(req,res){
if(req.body.password!=req.body.confirm_password){
    return res.redirect('back');
}
User.findOne({email:req.body.email}, function(err,user){
    if(err){
        console.log('err in finding  user while signing up');
        return;
    }
    if(!user){
        User.create(req.body,function(err,user){
            if(err)
            {
                console.log('err in creating user while signing up');
                return;
            }

            return res.redirect('/user/sign-in');

          });
    }
            else{
                return res.redirect('back');
            }
            
        });
    }


// sign in and create a session for user
module.exports.createSession=function(req,res){
// steps to authenticate

// find the user
User.findOne({email:req.body.email},function(err,user) {

 if(err){console.log('error in finding in user signing in'); return}
    
 // handle user found
 if(user){
     // handle passord which does not match
  if(user.password!=req.body.password)
  {
      return res.redirect('back');
  }

     // handle session creation
     res.cookie('user_id',user._id);
     return res.redirect('/user/profile');
 }
 else{
     // handle user is not found
     return res.redirect('back');
 }
});
}



//sign out
module.exports.signOut=function(req,res){
    res.clearCookie('user_id');
    console.log('cookie is cleared');
    return res.redirect('/user/sign-in');
}
