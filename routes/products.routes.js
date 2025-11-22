const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');
const { authBearer } = require('../middlewares/auth.middleware');

// GET semua produk
router.get('/', productsController.getAllProducts);

// GET produk berdasarkan ID
router.get('/:id', productsController.getProductById);

// CREATE produk baru (dilindungi)
router.post('/', authBearer, productsController.createProduct);

// UPDATE produk (dilindungi)
router.put('/:id', authBearer, productsController.updateProduct);

// DELETE produk (dilindungi)
router.delete('/:id', authBearer, productsController.deleteProduct);

module.exports = router;