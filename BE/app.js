const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRoutes = require('../BE/routes/products');

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

const multer = require('multer');
const path = require('path');

// Cấu hình nơi lưu ảnh
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads'); // Ảnh sẽ được lưu vào thư mục này
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Đổi tên file thành timestamp + đuôi file
    }
});

const upload = multer({ storage: storage });
