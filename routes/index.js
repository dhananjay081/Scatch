const express = require("express");
const router = express.Router();
const isloggedin = require("../middlewares/isLoggedin")
const productModel = require("../models/product-model");

router.get("/",function(req, res){
    let error = req.flash("error")
    res.render("index",{ error })
});

router.get('/shop',isloggedin, async (req, res) => {
    try {
        let products = await productModel.find(); // Replace with your data fetching logic
        res.render('shop', { products: products });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


module.exports = router;