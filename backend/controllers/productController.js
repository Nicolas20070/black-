// src/controllers/productController.js
const Product = require('../models/Product');

// Obtener todos los productos
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener los productos.' });
    }
};

// Agregar un nuevo producto
const addProduct = async (req, res) => {
    try {
        const { nombre, categoria, color, precio, cantidad, imagen } = req.body;

        const newProduct = new Product({
            nombre,
            categoria,
            color,
            precio,
            cantidad,
            imagen
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).send({ message: 'Error al agregar el producto.' });
    }
};

// Editar un producto existente
const editProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const { nombre, categoria, color, precio, cantidad, imagen } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { nombre, categoria, color, precio, cantidad, imagen },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).send({ message: 'Producto no encontrado.' });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).send({ message: 'Error al editar el producto.' });
    }
};

// Eliminar un producto
const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).send({ message: 'Producto no encontrado.' });
        }

        res.status(200).json({ message: 'Producto eliminado exitosamente.' });
    } catch (error) {
        res.status(500).send({ message: 'Error al eliminar el producto.' });
    }
};

module.exports = {
    getProducts,
    addProduct,
    editProduct,
    deleteProduct
};
