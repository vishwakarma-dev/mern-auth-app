const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth');

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: This endpoint allows you to register a new user with a first name, last name, email, mobile number, and password.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - email_id
 *               - password
 *               - mobile_number
 *             properties:
 *               first_name:
 *                 type: string
 *                 description: The first name of the user
 *               last_name:
 *                 type: string
 *                 description: The last name of the user
 *               email_id:
 *                 type: string
 *                 description: The user's email
 *               password:
 *                 type: string
 *                 description: The user's password
 *               mobile_number:
 *                 type: string
 *                 description: The user's mobile number
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for the newly registered user
 *       400:
 *         description: User already exists or invalid input
 *       500:
 *         description: Internal server error
 */
router.post('/register', register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     description: Authenticate an existing user by providing an email or mobile number along with a password.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email_id
 *               - password
 *             properties:
 *               email_id:
 *                 type: string
 *                 description: The user's email or mobile number
 *               password:
 *                 type: string
 *                 description: The user's password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for the authenticated user
 *       400:
 *         description: Invalid credentials or user not found
 *       500:
 *         description: Internal server error
 */
router.post('/login', login);

module.exports = router;
