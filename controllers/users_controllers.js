
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


// sign and create a session for user
module.exports.createSession=function(req,res){

}