// src/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    correo_electronico: {
        type: String,
        required: true,
        unique: true
    },
    contrasena: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
    },
    direccion: {
        type: String,
    },
    ciudad: {
        type: String,
    },
    codigo_postal: {
        type: String,
    },
    fecha_nacimiento: {
        type: Date,
    },
    genero: {
        type: String,
        enum: ['M', 'F', 'Otro'],
    },
    preferencias: {
        type: Map,
        of: String
    },
    rol: {
        type: String,
        enum: ['administrador', 'empleado', 'cliente'],
        default: 'cliente'
    },
    fecha_registro: {
        type: Date,
        default: Date.now
    },
    ultimo_acceso: {
        type: Date,
    },
    estado: {
        type: String,
        enum: ['activo', 'inactivo', 'suspendido'],
        default: 'activo'
    },
    imagen_perfil: {
        type: String,
    },
    ultima_compra: {
        type: Date,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
