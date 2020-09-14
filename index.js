const express=require('express');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
app.use(express.static('assets'));

app.use(expressLayouts);

app.set('layout extractStyles',true);
app.set('layout extractScript',true);


app.use('/',require('./routers'));



app.set('view engine','ejs');
app.set('views','./views');


app.listen(port,function(err){
    if(err){
        console.log(`error in running up of server:${err}`);
        return;
    }
console.log(`server is running on:${port}`);
});
