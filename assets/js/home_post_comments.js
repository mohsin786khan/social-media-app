     class PostComment{

     constructor(postId){
         this.postId=postId;
         this.PostContainer=$(`#post-${postId}`);
         this.newCommentForm=$(`#post-${postId}-comments-form`);

         this.createComment(postId);
     }


     createComment(postId){
         let pself=this;
         this.newCommentForm.submit(function(e){
             e.preventDefault();
             let self=this;
            
             $.ajax({
               type:'post',
               url:'/comments/create',
               data:$(self).serialize(),
               success:function(data)
               {
                   console.log(data);
               }, error:function(error){
                console.log(error.reposoneText);
               }
             });

         });
     }


     } 

  
    

    



  


    