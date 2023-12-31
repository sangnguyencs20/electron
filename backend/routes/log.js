const express = require("express");
const router = express.Router();


const { getLogs, createLog, getLogsByDocumentId, getLogsByUserId, getLogsByOpinionId, getLogsBytxHash } = require("../controllers/logController");
/**
 * @swagger
 * tags:
 *   name: Logs
 *   description: History of all actions performed by users
 */

/**
 * @swagger
 * /api/logs:
 *   get:
 *     summary: Get all logs
 *     tags: [Logs]
 *     responses:
 *       200:
 *         description: Successfully retrieved logs
 *   post:
 *     summary: Create a new log
 *     tags: [Logs]
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: Successfully created log
 *       500:
 *         description: Internal server error
 */

router.get("/", getLogs);

router.post("/", createLog);

/**
 * @swagger
 * /api/logs/document/{documentId}:
 *   get:
 *     summary: Get all logs by document ID
 *     tags: [Logs]
 *     parameters:
 *       - in: path
 *         name: documentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the document
 *     responses:
 *       200:
 *         description: Successfully retrieved logs by document ID
 *       500:
 *         description: Internal server error
 */

router.get("/document/:documentId", getLogsByDocumentId);

/**
 * @swagger
 * /api/logs/user/{userId}:
 *   get:
 *     summary: Get all logs by user ID
 *     tags: [Logs]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: Successfully retrieved logs by user ID
 *       500:
 *         description: Internal server error
 */

router.get("/user/:userId", getLogsByUserId);

/**
 * @swagger
 * /api/logs/opinion/{opinionId}:
 *   get:
 *     summary: Get all logs by opinion ID
 *     tags: [Logs]
 *     parameters:
 *       - in: path
 *         name: opinionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the opinion
 *     responses:
 *       200:
 *         description: Successfully retrieved logs by opinion ID
 *       500:
 *         description: Internal server error
 */

router.get("/opinion/:opinionId", getLogsByOpinionId);

/**
 * @swagger
 * /api/logs/transaction/{txHash}:
 *   get:
 *     summary: Get all logs by transaction ID
 *     tags: [Logs]
 *     parameters:
 *       - in: path
 *         name: txHash
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the transaction
 *     responses:
 *       200:
 *         description: Successfully retrieved logs by transaction ID
 *       500:
 *         description: Internal server error
 */

router.get("/transaction/:txHash", getLogsBytxHash);


module.exports = router;