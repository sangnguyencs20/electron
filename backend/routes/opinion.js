const express = require("express");
const router = express.Router();

const { getOpinionsOfADocument, createOpinion } = require("../controllers/opinionController");

/**
 * @swagger
 * /opinions/{documentId}:
 *   get:
 *     summary: Get opinions of a document
 *     tags: [Opinion]
 *     parameters:
 *       - in: path
 *         name: documentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the document
 *     responses:
 *       200:
 *         description: Successfully retrieved opinions of the document
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   createdBy:
 *                     type: string
 *                     description: The ID of the user who created the opinion
 *                   documentID:
 *                     type: string
 *                     description: The ID of the document
 *                   content:
 *                     type: string
 *                     description: The content of the opinion
 *       404:
 *         description: Document not found or no opinions available
 *       500:
 *         description: Internal server error
 */

router.get("/:documentId", getOpinionsOfADocument);

/**
 * @swagger
 * /opinions:
 *   post:
 *     summary: Create a new opinion
 *     tags: [Opinion]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               createdBy:
 *                 type: string
 *                 description: The ID of the user who created the opinion
 *               documentID:
 *                 type: string
 *                 description: The ID of the document
 *               content:
 *                 type: string
 *                 description: The content of the opinion
 *     responses:
 *       201:
 *         description: Successfully created the opinion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 createdBy:
 *                   type: string
 *                   description: The ID of the user who created the opinion
 *                 documentID:
 *                   type: string
 *                   description: The ID of the document
 *                 content:
 *                   type: string
 *                   description: The content of the opinion
 *       400:
 *         description: Bad request, invalid input
 *       500:
 *         description: Internal server error
 */

router.post("/", createOpinion);

module.exports = router;


module.exports = router;