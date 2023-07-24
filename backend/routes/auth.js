const express = require("express");
const router = express.Router();
const { login, signup, logout, confirmPassword } = require("../controllers/auth");
const verifyToken = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully logged in
 *       401:
 *         description: Invalid username or password
 *       500:
 *         description: Internal server error
 */

router.post("/login", login);

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: User signup
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               fullName:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               address:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               position:
 *                 type: string
 *               ssn:
 *                 type: string
 *               department:
 *                 type: string
 *                 description: Department ID
 *     responses:
 *       201:
 *         description: Successfully signed up
 *       409:
 *         description: Username or SSN already exists
 *       500:
 *         description: Internal server error
 */

router.post("/signup", signup);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: User logout
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Successfully logged out
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

router.post("/logout", verifyToken, logout);

router.post("/confirm", verifyToken, confirmPassword)
module.exports = router;