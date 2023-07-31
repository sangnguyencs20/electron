const express = require("express");
const router = express.Router();

const {
    getDocuments,
    createDocument,
    getDocumentById,
    getDocumentOfUser,
    getPublishedDocuments,
    submitDocument,
    publishDocument,
    getAllDocumentsOfApprover,
    assignDocumentToApprover,
    approveADocument,
    getApprovalHistoryOfDocument,
    finishDocument
}
    = require("../controllers/documentController");

/**
 * @swagger
 * tags:
 *   name: Document
 *   description: Document endpoints
 */

/**
 * @swagger
 * /api/documents:
 *   get:
 *     summary: Get all documents
 *     tags: [Document]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number for pagination (e.g., 1, 2, 3, ...)
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: The number of documents to fetch per page
 *     responses:
 *       200:
 *         description: Successfully retrieved documents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                     description: The title of the document
 *                   createdBy:
 *                     type: string
 *                     description: The ID of the user who created the document
 *                   receiver:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: The IDs of the users who are the receivers of the document
 *                   secretState:
 *                     type: string
 *                     enum: ['Low', 'Neutral', 'High']
 *                     default: 'Neutral'
 *                     description: The secret state of the document
 *                   urgencyState:
 *                     type: string
 *                     enum: ['Low', 'Neutral', 'High']
 *                     default: 'Neutral'
 *                     description: The urgency state of the document
 *                   fileLink:
 *                     type: string
 *                     description: The link to the file of the document
 *       404:
 *         description: Documents not found
 *       500:
 *         description: Internal server error
 */
router.get("/", getDocuments);


/**
 * @swagger
 * /api/documents:
 *   post:
 *     summary: Create a new document
 *     tags: [Document]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the document
 *               receiver:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The IDs of the users who are the receivers of the document
 *               fileLink:
 *                 type: string
 *                 description: The link to the file of the document
 *               description:
 *                 type: string
 *                 description: The description of the document
 *     responses:
 *       201:
 *         description: Successfully created document
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   description: The title of the document
 *                 receiver:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: The IDs of the users who are the receivers of the document
 *                 fileLink:
 *                   type: string
 *                   description: The link to the file of the document
 *                 description:
 *                   type: string
 *                   description: The description of the document
 *       409:
 *         description: Document creation conflict
 *       500:
 *         description: Internal server error
 */

router.post("/", createDocument);
/**
 * @swagger
 * paths:
 *   /api/documents/accepted:
 *     get:
 *       tags: [Document]
 *       summary: Get all accepted documents
 *       description: Retrieve all documents with a status of "Accepted"
 *       parameters:
 *         - name: page
 *           in: query
 *           description: Page number for pagination (if applicable)
 *           required: false
 *           schema:
 *             type: integer
 *             minimum: 1
 *             default: 1
 *         - name: pageSize
 *           in: query
 *           description: Number of items per page for pagination (if applicable)
 *           required: false
 *           schema:
 *             type: integer
 *             minimum: 1
 *             maximum: 100
 *             default: 20
 *       responses:
 *         200:
 *           description: Successful operation
 *         403:
 *           description: Unauthorized - User is not authorized to view this content
 *         500:
 *           description: Internal Server Error - An error occurred while processing the request
 *       security:
 *         - bearerAuth: []
 */

router.get("/accepted", getPublishedDocuments);

/**
 * @swagger
 * /api/documents/{id}:
 *   get:
 *     summary: Get a document by ID
 *     tags: [Document]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the document
 *     responses:
 *       200:
 *         description: Successfully retrieved document
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   description: The title of the document
 *                 createdBy:
 *                   type: string
 *                   description: The ID of the user who created the document
 *                 receiver:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: The IDs of the users who are the receivers of the document
 *                 secretState:
 *                   type: string
 *                   enum: ['Low', 'Neutral', 'High']
 *                   default: 'Neutral'
 *                   description: The secret state of the document
 *                 urgencyState:
 *                   type: string
 *                   enum: ['Low', 'Neutral', 'High']
 *                   default: 'Neutral'
 *                   description: The urgency state of the document
 *                 fileLink:
 *                   type: string
 *                   description: The link to the file of the document
 *       404:
 *         description: Document not found
 *       500:
 *         description: Internal server error
 */

router.get("/:id", getDocumentById);

/**
 * @swagger
 * /api/documents/myDocument:
 *   post:
 *     summary: Get draft documents of a user (DOCUMENTS THAT USER CREATED)
 *     tags: [Document]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number for pagination (e.g., 1, 2, 3, ...)
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: The number of documents to fetch per page
 *     responses:
 *       200:
 *         description: Successfully retrieved user's documents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                     description: The title of the document
 *                   createdBy:
 *                     type: string
 *                     description: The ID of the user who created the document
 *                   receiver:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: The IDs of the users who are the receivers of the document
 *                   secretState:
 *                     type: string
 *                     enum: ['Low', 'Neutral', 'High']
 *                     default: 'Neutral'
 *                     description: The secret state of the document
 *                   urgencyState:
 *                     type: string
 *                     enum: ['Low', 'Neutral', 'High']
 *                     default: 'Neutral'
 *                     description: The urgency state of the document
 *                   fileLink:
 *                     type: string
 *                     description: The link to the file of the document
 *       404:
 *         description: User's documents not found
 *       500:
 *         description: Internal server error
 */
router.post("/myDocument", getDocumentOfUser);

/**
 * @swagger
 * /api/submit/{documentId}:
 *   post:
 *     summary: Submit a document
 *     tags: [Document]
 *     description: Submit a document by its ID
 *     parameters:
 *       - in: path
 *         name: documentId
 *         required: true
 *         description: ID of the document to submit
 *         schema:
 *           type: string
 *       - in: body
 *         name: body
 *         required: true
 *         description: User ID and additional data
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *               format: objectId
 *               required: true
 *           example:
 *             userId: 64a1768f0c096167bfb31bf9
 *     responses:
 *       200:
 *         description: Document submitted successfully
 *       401:
 *         description: Unauthorized - User not authorized to submit the document
 *       404:
 *         description: Document not found
 *       500:
 *         description: Internal server error
 */
//this will submit to the boss
router.post("/submit/:documentId", submitDocument);

/**
* @swagger
* /api/documents/publish/{documentId}:
*   post:
 *     summary: Publish a document
 *     tags: [Document]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the document to be published.
 *     requestBody:
 *       description: Data required for document publication.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               txHash:
 *                 type: string
 *                 required: true
 *                 description: The transaction hash for publishing the document.
 *             example:
 *               txHash: "0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"
 *     responses:
 *       200:
 *         description: Document published successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *       401:
 *         description: Unauthorized or invalid request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: An error message indicating the reason for the failure.
 *       404:
 *         description: Document not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: An error message indicating the document was not found.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: An error message indicating an internal server error occurred.
 */

// it will publish the document to home
router.post("/publish/:id", publishDocument);

/**
 * @swagger
 * /api/documents/comingDocument:
 *   post:
 *     summary: Get all coming documents of an approver
 *     tags: [Document]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number for pagination (e.g., 1, 2, 3, ...)
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: The number of documents to fetch per page
 *     responses:
 *       200:
 *         description: List of documents
 */
router.post("/comingDocument", getAllDocumentsOfApprover);

/**
 * @swagger
 * /api/documents/assign:
 *   post:
 *     summary: Assign a document to an user
 *     tags: [Document]
 *     requestBody:
 *       description: Feedback data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               documentId: 
 *                 type: ObjectID
 *                 required: true
 *               userIds:
 *                 type: Array
 *                 required: true
 *             example:
 *               documentId: "64b51ac7711bf25db25a32e0"
 *               userIds: ["64b51ac7711bf25db25a32e1", "64b51ac7711bf25db25a32e2"]
 *     responses:
 *       200:
 *         description: Success message
 *
 * */
router.post("/assign", assignDocumentToApprover);

/**
 * @swagger
 * /api/documents/approve:
 *   post:
 *     summary: Approve a document
 *     tags: [Document]
 *     requestBody:
 *       description: Data required for document approval.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               documentId:
 *                 type: string
 *                 required: true
 *                 description: The ID of the document to be approved.
 *               comment:
 *                 type: string
 *                 required: true
 *                 description: Your feedback/comment on the document.
 *               status:
 *                 type: string
 *                 enum: [Approved, Rejected]
 *                 required: true
 *                 description: The approval status of the document (either "Approved" or "Rejected").
 *             example:
 *               documentId: "64b76498dd6d5ecad41c04cd"
 *               comment: "This document looks good."
 *               status: "Approved"
 *     responses:
 *       200:
 *         description: Document approved and commented successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *       400:
 *         description: Invalid request data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message indicating invalid request data.
 *       404:
 *         description: Document not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message indicating the document was not found.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message indicating an internal server error occurred.
 */


router.post("/approve", approveADocument);

/**
 * @swagger
 * /api/documents/{documentId}/history:
 *   get:
 *     summary: Get approval history of a document
 *     tags: [Document]
 *     parameters:
 *       - name: documentId
 *         in: path
 *         description: ID of the document
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   receiver:
 *                     type: string
 *                     description: The ID of the receiver
 *                   status:
 *                     type: string
 *                     description: The status of the approval
 *                   time:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp of the approval
 *                   comment:
 *                     type: string
 *                     description: The comment of the approval
 *       400:
 *         description: Invalid document ID
 *       404:
 *         description: Document not found
 *       500:
 *         description: Internal server error
 */
router.get("/:documentId/history", getApprovalHistoryOfDocument)


/**
 * Finish a document.
 *
 * @swagger
 * api/documents/finish/{documentId}:
 *   post:
 *     tags: [Document]
 *     summary: Finish a document
 *     description: Finish a document with the specified documentId.
 *     parameters:
 *       - in: path
 *         name: documentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the document to finish.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               txHash:
 *                 type: string
 *             required:
 *               - txHash
 *     responses:
 *       200:
 *         description: Document finished successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *       401:
 *         description: Unauthorized or invalid request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message indicating the reason for the failure.
 *       404:
 *         description: Document not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message indicating the document was not found.
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: An error message indicating a server error occurred.
 */

router.post("/finish/:documentId", finishDocument)

module.exports = router;