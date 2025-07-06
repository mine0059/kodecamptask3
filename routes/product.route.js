const express = require('express');
const { getProducts, getProductById, addProduct, editProduct, editProductStatus, deleteProduct } = require('../controllers/product.controller');

const router = express.Router();

router.get('/', getProducts);

router.get('/:id', getProductById);

router.post('/product', addProduct);

router.patch('/:id', editProduct);

router.patch('/product-status/:id', editProductStatus);

router.delete('/:id', deleteProduct);

module.exports = router;