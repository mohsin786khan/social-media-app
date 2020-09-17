
const { findOne } = require('../models/user');
const User=require('../models/user');

module.exports.profile=function(req,res){
    return res.render('user_profile',{
        title:'major'
    })
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
     console.log('succesfully logged in  *****');
     return res.redirect('/user/profile');
 }
 else{
     // handle user is not found
     return res.redirect('back');
 }
});
}