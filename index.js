const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
const { urlencoded}  = require('express');
// use for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const mongoStore=require('connect-mongo')(session);


app.use(urlencoded());
app.use(cookieParser());
app.use(express.static('assets'));
app.use(expressLayouts);

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);





app.set('view engine','ejs');
app.set('views','./views');

// mongo store is used to store the session cookie in db
app.use(session({
name:'codial',
secret:'something',
saveUninitialized:false,
resave:false,
cookie:{
    maxAge:(100*60*100)
},
store:new mongoStore(
    {
    mongooseConnection:db,
    autoRemove:'disabled'
    },
    function(err){
        console.log(err || 'connect mongodb setup ok');
    }
)
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use express router
app.use('/',require('./routers'));


app.listen(port,function(err){
    if(err){
        console.log(`error in running up of server:${err}`);
        return;
    }
console.log(`server is running on:${port}`);
});
