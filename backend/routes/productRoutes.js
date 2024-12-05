// src/routes/productRoutes.js
const express = require('express');
const { getProducts, addProduct, editProduct, deleteProduct } = require('../controllers/productController');
const router = express.Router();

// Ruta para obtener todos los productos
router.get('/', getProducts);

// Ruta para agregar un nuevo producto
router.post('/', addProduct);

// Ruta para editar un producto
router.put('/:productId', editProduct);

// Ruta para eliminar un producto
router.delete('/:productId', deleteProduct);

module.exports = router;
