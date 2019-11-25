const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const storagePath = path.join(__dirname, '../', 'public/');
require('../config/config');
const Product = require('../models/product');
// console.log(storagePath);
const storage = multer.diskStorage({
    destination:storagePath+'uploads/',
    filename : function(req, file, cb) {
        const dotPosition = file.originalname.toString().lastIndexOf('.');
        const getExtension = file.originalname.toString().slice(dotPosition, file.originalname.toString().length);
        cb(null, 'Product-image-'+Date.now()+getExtension);
    }
})
const upload = multer({storage:storage});
router.get('/', (req, res, next)=>{
    res.render('admin/index')
})

router.post('/dashboard', (req, res, next)=>{
    if (req.body.username=='test' && req.body.password == 'test') {
        res.render('admin/dashboard');
    }
})
router.get('/addArticle', (req, res, next)=>{
    let result = {}
    res.render('admin/add-article',{product_details:result});
})
router.get('/addArticle/:id', (req, res, next) =>{
    // res.json(req.params.id);
    Product.findOne({_id:req.params.id}, (err, result)=>{
        if (err) {
            console.log(err);   
        }
        // console.log(result);
        res.render('admin/add-article', {product_details:result});
    })
})
router.get('/viewArticle', (req, res, next)=>{
    Product.find({},(err, products)=>{
        if (err) {
            // throw new Error('Something Went Wrng')
            console.error(err);  
        }
        // console.log(products);
        res.render('admin/view-articles',{products:products});
    })
})

router.get('/changepassword', (req, res, next)=>{
    res.render('admin/changepassword');
})

router.delete('/deleteproduct', (req, res, next)=>{
    
    Product.findOneAndRemove({_id:req.body.productId}, (err, result)=>{
        if (err) {
            throw new Error('unble to delete')
        }
        res.send(result)
    })
    
})
router.post('/addproduct',upload.array('images_files', 10), (req, res, next)=>{
    const insertData = {};
    const image_gallery = [];
    insertData.title = req.body.title;
    insertData.price = req.body.price;
    insertData.product_description = req.body.article;
    insertData.featured_image = req.files[0].filename;
    for (let i = 1; i < req.files.length; i++) {
        image_gallery.push(req.files[i].filename);
    }
    insertData.gallery_images = image_gallery;
    if (typeof req.body.product_id!=='undefined') {
        console.log("if");
    } else {
        console.log("else");
    }
    const product = new Product(insertData);
    product.save((err, result)=>{
        if (err) {
            console.error(err);
        }
        console.log(req.url);
        res.redirect('addArticle');
        console.log(result);
        
    }) 
})
module.exports = router