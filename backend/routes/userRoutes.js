// src/routes/userRoutes.js
const express = require('express');
const { auth, authorize } = require('../middleware/authMiddleware');
const { registerUser, loginUser, getAllUsers } = require('../controllers/userController');

const router = express.Router();

// Ruta de registro
router.post('/register', registerUser);

// Ruta de login
router.post('/login', loginUser);

// Ruta para obtener todos los usuarios (solo para administradores)
router.get('/all', auth, authorize(['administrador']), getAllUsers);

module.exports = router;
