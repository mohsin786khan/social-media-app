const nodeMailer = require('../config/nodemailer');

// this is another way of exporting method
exports.newComment = (comment)=>{
    console.log('inside new comments mailer', comment);

 let htmlString = nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from:'khan.mohsin.00001@gmail.com',
        to:comment.user.email,
       subject:'new comment published ',
       html:htmlString
    },(err,info)=>{
        if(err){
            console.log('error in mailing',err);
            return;
        }

        console.log('message semt', info);
        return;

    });
}