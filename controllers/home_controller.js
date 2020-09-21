module.exports.home=function(req,res){
   console.log('R',req.cookies);
   return res.render('home',{
    title:"major"
   });

}