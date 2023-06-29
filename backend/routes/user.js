const express = require("express");
const router = express.Router();

const { getUsers, getUserById, updateUser, deleteUser } = require("../controllers/userController");

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Successfully retrieved users
 *       404:
 *         description: No users found
 *       500:
 *         description: Internal server error
 *
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Successfully created the user
 *       400:
 *         description: Bad request, invalid input
 *       500:
 *         description: Internal server error
 *
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: Successfully retrieved the user
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 *
 *   post:
 *     summary: Update a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successfully updated the user
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     responses:
 *       204:
 *         description: Successfully deleted the user
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;


module.exports = router;