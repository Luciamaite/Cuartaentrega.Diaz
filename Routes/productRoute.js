const express = require('express');
const router = express.Router();
const product = require('../product');

router.get('/', product.getAllProducts);
router.get('/:pid', product.getProductById);
router.post('/', product.addProduct);
router.put('/:pid', product.updateProduct);
router.delete('/:pid', product.deleteProduct);

module.exports = router;
