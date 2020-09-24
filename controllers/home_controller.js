const Post=require('../models/post');


module.exports.home=function(req,res){
//   console.log('R',req.cookies);

//    Post.find({},function(err,posts){
//       return res.render('home',{
//          title:"major",
//           posts: posts
//    });
//  });
 

// popualate the user of each post
Post.find({}).populate('user').exec(function(err,posts) {
   return res.render('home',{
                  title:"major",
                  posts: posts
          });
}

);
}
