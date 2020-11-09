const User=require('../../../models/user');
const JWT=require('jsonwebtoken');



module.exports.createSession =async function(req, res){
    try{
  let user= await User.findOne({email:req.body.email});//sahi hain id se kaise dundh lenge app ha bro it was wrong now try

   if(!user && user.password!=req.body.password)
   {
       return res.json(422,{
       message:"Invalid user name or password"
       });
   }

   return res.json(200,{
    message:"sign in successfull, here is your token",
    data:{
        token:JWT.sign(user.toJSON(),'codial',{expiresIn:'10000'})
    }
   });
//phele post wala dekh te hai ok
    }
    catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}