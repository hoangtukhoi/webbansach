const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/products');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect('mongodb://localhost:27017/products',{
   useNewUrlParser: true,
   useUnifiedTopology : true 
}).then(()=>{
    console.log("Kết nối thành công");
}).catch(err =>{
    console.log("Kết nối thất bại", err.message);
});
app.use('/', productRoutes);
app.listen(3000,()=>{
    console.log("Server đang chạy tại cổng 3000");
});

