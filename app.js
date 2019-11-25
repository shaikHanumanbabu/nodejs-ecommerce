const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const userRouter = require('./router/user');
const adminRouter = require('./router/admin');
app.use(session({secret:'ssshhh',resave:false,saveUninitialized: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, '/public')))
app.set('view engine', 'ejs');
app.use(userRouter);
app.use('/admin', adminRouter);
app.listen(3000, ()=>{
    console.log('Server Running!');
})