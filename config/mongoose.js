const mongooose=require('mongoose');


mongooose.connect('mongodb://localhost/major-project_development',{ useNewUrlParser: true });

const db=mongooose.connection;

db.on('error',console.error.bind(console,"error in connecting to MongoDB"));

db.once('open',function(){
console.log('connected to database::MongoDB');
});


module.exports=db;