// src/controllers/userController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

// Registro de usuario
const registerUser = async (req, res) => {
    try {
        const { nombre, apellido, correo_electronico, contrasena, telefono, direccion, ciudad, codigo_postal, fecha_nacimiento, genero } = req.body;

        // Verificar si el usuario ya existe
        const userExists = await User.findOne({ correo_electronico });
        if (userExists) {
            return res.status(400).send({ message: 'El usuario ya está registrado.' });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        // Crear el nuevo usuario
        const user = new User({
            nombre,
            apellido,
            correo_electronico,
            contrasena: hashedPassword,
            telefono,
            direccion,
            ciudad,
            codigo_postal,
            fecha_nacimiento,
            genero,
            rol: 'cliente' // Por defecto, rol de cliente
        });

        // Guardar el usuario en la base de datos
        await user.save();

        res.status(201).send({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).send({ message: 'Error al registrar usuario' });
    }
};

// Login de usuario
const loginUser = async (req, res) => {
    try {
        const { correo_electronico, contrasena } = req.body;

        // Buscar el usuario por correo electrónico
        const user = await User.findOne({ correo_electronico });

        if (!user) {
            return res.status(400).send({ message: 'Usuario no encontrado.' });
        }

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(contrasena, user.contrasena);
        if (!isMatch) {
            return res.status(400).send({ message: 'Contraseña incorrecta.' });
        }

        // Crear el token con el rol y la información del usuario
        const token = jwt.sign(
            { _id: user._id, role: user.rol }, // Payload con id y rol
            process.env.JWT_SECRET,
            { expiresIn: '1d' } // Token expirará en 1 día
        );

        // Devolver el token y el rol del usuario
        res.status(200).send({ token, role: user.rol });
    } catch (error) {
        res.status(500).send({ message: 'Error al iniciar sesión.' });
    }
};


// Obtener todos los usuarios (solo para administradores)
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener los usuarios.' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getAllUsers
};
