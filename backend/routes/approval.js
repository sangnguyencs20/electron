const express = require("express");
const router = express.Router();

const { getApprovalsOfADocument, postAnApprovalOfADocument } = require("../controllers/approvalController");

/**
 * @swagger
 * /approval/:documentId:
 *   get:
 *     summary: Get Approval of a document (History of approving)
 *     tags: [Approval]
 *     parameters:
 *       - in: path
 *         name: documentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the document
 *     responses:
 *       200:
 *         description: Success message
 * */




//userId, status, content
router.get("/:documentId", getApprovalsOfADocument);  
router.post("/:documentId", postAnApprovalOfADocument);

module.exports = router;