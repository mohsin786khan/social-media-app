const express=require('express');
const app=express();
const port=8000;


app.use('/',require('./routers'));


app.set('veiw engine','ejs');
app.set('views','./views');


app.listen(port,function(err){
    if(err){
        console.log(`error in running up of server:${err}`);
        return;
    }
console.log(`server is running on:${port}`);
});