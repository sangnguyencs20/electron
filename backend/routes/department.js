const express = require("express");
const router = express.Router();

const {
    getDepartments,
    createDepartment,
    getAllUsersOfADepartment
} = require("../controllers/departmentController");


/**
 * @swagger
 * tags:
 *   name: Department
 *   description: Department endpoints
 */

/**
 * @swagger
 * /api/departments:
 *   get:
 *     summary: Get all departments
 *     tags: [Department]
 *     responses:
 *       200:
 *         description: Successfully retrieved departments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: The name of the department
 *                   abbr:
 *                     type: string
 *                     description: The abbreviation of the department
 *                   address:
 *                     type: string
 *                     description: The address of the department
 *       404:
 *         description: Departments not found
 *       500:
 *         description: Internal server error
 */

router.get("/", getDepartments);

/**
 * @swagger
 * /api/departments:
 *   post:
 *     summary: Create a new department
 *     tags: [Department]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the department
 *               abbr:
 *                 type: string
 *                 description: The abbreviation of the department
 *               address:
 *                 type: string
 *                 description: The address of the department
 *     responses:
 *       201:
 *         description: Successfully created department
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: The name of the department
 *                 abbr:
 *                   type: string
 *                   description: The abbreviation of the department
 *                 address:
 *                   type: string
 *                   description: The address of the department
 *       409:
 *         description: Department already exists
 *       500:
 *         description: Internal server error
 */

router.post("/", createDepartment);

/**
 * @swagger
 * /api/departments/users:
 *   post:
 *     summary: Get all users of a department of a user (in request.userId)
 *     tags: [Department]
*     responses:
 *       200:
 *         description: Successfully retrieved users
 *       404:
 *         description: No users found
 *       500:
 *         description: Internal server error
 */
router.post("/users", getAllUsersOfADepartment)

module.exports = router;
