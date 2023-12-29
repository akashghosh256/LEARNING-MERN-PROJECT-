const mongoose = require('mongoose');

const DB = process.env.DATABASE;  //SECURITY
mongoose.connect(DB, {
    //to avoid deprecation warning
    useNewUrlParser : true, 
 //   useCreateIndex: true,
    useUnifiedTopology: true,  
//useFindAndModify : false
}).then(() =>{
    console.log('DB connection successful');
}).catch((err) => console.log('DB connection fail'));