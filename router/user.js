const express = require('express');
const router = express.Router();
const Product = require('../models/product');
router.get('/', (req, res, next) => {
    const data = {
        name : "hanuman",
        age : 28
    }
    res.render('user/index', {data})
    
});
router.get('/contact', (req, res, next)=>{
    res.render('user/contact');
})

router.get('/products', async(req, res, next) =>{

    let responsePer = 2;
    let page = req.query.page || 1;
    
    const foundProducts = await Product.find({}).skip((responsePer*page)-responsePer).limit(responsePer);
    const totalProducts = await Product.find({});
    
    if (foundProducts) {
        res.render('user/products', 
        {
            products:foundProducts, 
            totalPageCount:Math.ceil(totalProducts.length/responsePer),
            pageNumber: page});
    }

})

router.get('/product_details/:id', (req, res, next)=>{
    Product.findOne({_id: req.params.id}, (err, data)=>{
        if (err) {
            console.log(err);
        } else {
            /*console.log("=================== PRODUCT DETAILS =============");
            console.log(data);*/
            res.render('user/product_details', {singleProduct:data});
        }
    })
})

router.get('/about', (req, res, next)=>{
    res.render('user/about');
});

router.get('/cart', (req, res, next)=>{
    res.render('user/cart');
})

router.post('/addCart', (req, res, next) =>{
    req.session.productItems;
    // const cartProducts = req.session.productItems || [];
    /*console.log(cartProducts);
    
    console.log(req.body);
    req.session.productItems = [];*/
    /*cartProducts.push(req.body);
    req.session.productItems = cartProducts;
    console.log("================= After Insertion===============");
    
    console.log(req.session.productItems);*/
    
    /*console.log("====================");
    console.log(req.session.productItems);
    console.log("========== Product Length Array==========");
    console.log(cartProducts.length);*/
    /*if (cartProducts.length) {
        console.log("if");
        
    } else {
        cartProducts.push({
            id:req.body.product_id,
            productname: req.body.product_name,
            qty: req.body.product_qty,
            price: req.body.product_price
        });
        req.session.productItems = [];
        req.session.productItems.push(cartProducts);
    }*/
    /*console.log(req.params.productId);
    Product.findOne({_id:req.params.productId}, function(err, data) {
        if (err) {
            console.error(err);
        }
        console.log(data);  
    })
    res.json({error:"welcome"});*/
    const cartItems = req.session
})
function getPagination (model) {
    // console.log("comming from pagination page!");
    // next()
    return (req, res, next) => {
       /* let page = req.query.page || 1;
        debugger;
        let limit = parseInt(req.query.limit);
        let startIndex = (page -1) * limit;
        let endIndex =  page * limit;
        const result = {};
        if (startIndex > 0) {
            result.prevPage = {
                page : page,
                limit : limit
            }
        }
        if (endIndex < model.count({})) {
            result.nextPage = {
                page : page + 1,
                limit : limit
            }
        }
        result.pagenatedResult = await model.find().limit(limit).skip(startIndex).exec();
        res.paginatedResults = result;*/
        next()
    }   
}
module.exports = router;