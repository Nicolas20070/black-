// src/models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        enum: ['Chaquetas', 'Pantalones', 'Accesorios', 'Vestidos', 'Combos'],
        required: true
    },
    color: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    imagen: {
        type: String, // Almacenamos la URL de la imagen
        required: true
    },
    fecha_creacion: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', ProductSchema);
