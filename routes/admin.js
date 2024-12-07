const path = require('path');

const express = require('express');

const adminControllers = require('../controllers/admin');

const router = express.Router();

router.get('/add-product', adminControllers.addProductPage);

router.post('/add-product', adminControllers.sendAllProducts);

router.get('/products', adminControllers.getProducts);

module.exports = router;

// exports.routes = router;
