const express = require('express');
const path = require('path');

const router = express.Router();

const products = [];

router.get('/add-product', (req, res) => {
    res.render('add-product');
    // res.sendFile(path.join(__dirname, '../', 'views/html', 'add-product.html'));
});

router.post('/add-product', (req, res) => {
    products.push({ title: req.body.title });
    res.redirect('/');
});

//module.exports = router;

exports.routes = router;
exports.products = products;
