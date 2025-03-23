const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

//hien thi danh sach san pham
router.get('/admin', async(req,res) => {
    try {
        const products = await Product.find();
        res.render('admin', {products, product:null});
    } catch (error) {
        res.status(500).send(error.message);
    }
});
//them san pham
router.post('/add-product', async(req,res) =>{
    const {id, name, price, description} = req.body;
    const newProduct = new Product({id,name,price,description});
    try {
        //luu san pham
        await newProduct.save();
        //chuyen ve trang admin
        res.redirect('/admin');
    } catch (error) {
        res.status(500).send(error);
    }
});
//edit san pham
//lay thong tin san pham va chuyen ve trang admin
router.get('/edit-product/:id', async (req, res) => {
   try {
        const product = await Product.findById(req.params.id);

        const products = await Product.find();

        res.render('admin',{product, products});

   } catch (error) {
        res.status(500).send(error);
   } 
});
//sua thong tin san pham
router.post('/edit-product/:id', async (req,res) => {
   const {id, name, price, description} = req.body;
    try {
        await Product.findByIdAndUpdate(req.params.id, {name, price, description});
        res.redirect('/admin');
   } catch (error) {
        res.status(500).send(error);
   } 
});
router.post('/delete-product/:id', async (req,res) => {
   try {
        await Product.findByIdAndDelete(req.params.id);
        res.redirect('/admin');
   } catch (error) {
        res.status(500).send(error)
   } 
});

module.exports = router;