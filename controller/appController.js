const express = require('express');
const {getProducts, createProduct, deleteProduct, updateProduct } = require('../mongo/mongoUtil');
const router = express.Router();

//redirect the routs to its respective functionalities
router.get('/products', getProducts);
router.post('/products/create',createProduct);
router.delete('/products/:id', deleteProduct)
router.post('/products/:id/update_quantity', updateProduct);

module.exports = router;