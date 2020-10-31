const Comment=require('../models/comment');
const Post = require('../models/post');


module.exports.create =async function(req, res){
   try{
    await Post.create({
        content: req.body.content,
        user: req.user._id
    }); 
     return res.redirect('back');
   }catch(err){
     console.log('error',err);
     return;
   }

       
   
}


module.exports.destroy=async function(req,res){
    try{
     let post=Post.findById(req.params.id);
    // .id means converting the object id into string 
    if(post.user==req.user.id){
        post.remove();

      await Comment.deleteMany({post:req.params.id});
         return res.redirect('back');

    } else{
        return res.redirect('back');
    }
    }catch(err){
    console.log('error',err);
    return;
}

}