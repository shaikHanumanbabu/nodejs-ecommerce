const mongoose = require('mongoose');
const URL = "mongodb://127.0.0.1:27017/ecomm";
mongoose.connect(URL, {useNewUrlParser:true, useUnifiedTopology:true,useFindAndModify:false});
/*const db = mongoose.connection;
db.on('error', ()=>{
    console.error('error');
});
db.once('open',()=>{
    console.log('Success');
})*/