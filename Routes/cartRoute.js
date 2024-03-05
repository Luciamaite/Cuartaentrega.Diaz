const express = require('express');
const router = express.Router();
const cart = require('../cart');

router.get('/:cid', cart.getCartById);
router.post('/:cid/product/:pid', cart.addProductToCart);

module.exports = router;
