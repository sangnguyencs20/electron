const express = require("express");
const router = express.Router();

const {
    getDocuments,
    createDocument,
    getDocumentById,
    getDocumentOfUser,
    updateDocumentApproval,
    updateDocument,
    getAllDocumentsOfReceiver,
    submitFeedback,
    deleteDocument,
    getAllAcceptedDocuments,
    submitDocument,
    publishDocument,
    submitFeedbackFromApprover,
    getAllDocumentsOfApprover,
    assignDocumentToApprover,
    approveADocument
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
 *               secretState:
 *                 type: string
 *                 enum: ['Low', 'Neutral', 'High']
 *                 default: 'Neutral'
 *                 description: The secret state of the document
 *               urgencyState:
 *                 type: string
 *                 enum: ['Low', 'Neutral', 'High']
 *                 default: 'Neutral'
 *                 description: The urgency state of the document
 *               fileLink:
 *                 type: string
 *                 description: The link to the file of the document
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
 *       409:
 *         description: Document creation conflict
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * paths:
 *   /api/documents/accepted:
 *     get:
 *       tags: [Document]
 *       summary: Get all accepted documents
 *       description: Retrieve all documents with a status of "Accepted"
 *       responses:
 *         200:
 *           description: Successful operation
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Document'
 *         403:
 *           description: Unauthorized - User is not authorized to view this content
 *         500:
 *           description: Internal Server Error - An error occurred while processing the request
 *       security:
 *         - bearerAuth: []
 */
router.post("/", createDocument);


router.get("/accepted", getAllAcceptedDocuments);

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
 * /api/documents/users/{userId}:
 *   get:
 *     summary: Get documents of a user
 *     tags: [Document]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
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

router.get("/users/:userId", getDocumentOfUser);

/**
 * @swagger
 * /api/documents/approval/{id}:
 *   post:
 *     summary: Update document approval status
 *     tags: [Document]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the document
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               approvalStatus:
 *                 type: string
 *                 enum: ['Approved', 'Rejected']
 *                 description: The approval status of the document
 *     responses:
 *       200:
 *         description: Successfully updated document approval status
 *       404:
 *         description: Document not found
 *       500:
 *         description: Internal server error
 */

router.post("/approval/:id", updateDocumentApproval);

// /**
//  * @swagger
//  * /api/documents/{id}:
//  *   post:
//  *     summary: Update a document
//  *     tags: [Document]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The ID of the document
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               title:
//  *                 type: string
//  *                 description: The updated title of the document
//  *               receiver:
//  *                 type: array
//  *                 items:
//  *                   type: string
//  *                 description: The updated IDs of the users who are the receivers of the document
//  *               secretState:
//  *                 type: string
//  *                 enum: ['Low', 'Neutral', 'High']
//  *                 description: The updated secret state of the document
//  *               urgencyState:
//  *                 type: string
//  *                 enum: ['Low', 'Neutral', 'High']
//  *                 description: The updated urgency state of the document
//  *               fileLink:
//  *                 type: string
//  *                 description: The updated link to the file of the document
//  *     responses:
//  *       200:
//  *         description: Successfully updated document
//  *       404:
//  *         description: Document not found
//  *       500:
//  *         description: Internal server error
//  */

// router.post("/:id", updateDocument);

/**
 * @swagger
 * /api/documents/receiver/{receiverId}:
 *   get:
 *     summary: Get all documents of a specific receiver
 *     tags: [Document]
 *     parameters:
 *       - in: path
 *         name: receiverId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the receiver
 *     responses:
 *       200:
 *         description: Successfully retrieved documents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Document'
 *       404:
 *         description: Receiver not found or no documents found for the receiver
 *       500:
 *         description: Internal server error
 */
router.get("/receiver/:receiverId", getAllDocumentsOfReceiver);

/**
 * @swagger
 * /submit/{documentId}:
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
 * /documents/{documentId}/receiver/feedback:
 *   post:
 *     summary: Submit feedback for a document by a receiver
 *     tags: [Document]
 *     parameters:
 *       - name: documentId
 *         in: path
 *         description: ID of the document
 *         required: true
 *         schema:
 *           type: string
 *       - name: receiverId
 *         in: path
 *         description: ID of the receiver
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [Not Submitted, Submitted, Approved, Rejected]
 *     responses:
 *       '200':
 *         description: Feedback submitted successfully
 *       '400':
 *         description: Invalid request payload
 *       '404':
 *         description: Document or receiver not found
 *       '500':
 *         description: Server error
 */
// it will post the feedback from the boss to the creator of the document
router.post("/:documentId/receiver/feedback", submitFeedback);

/**
 * @swagger
 * /documents/{documentId}:
 *   delete:
 *     summary: Delete a document
 *     tags: [Document]
 *     parameters:
 *       - name: documentId
 *         in: path
 *         description: ID of the document to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Document deleted successfully
 *       '404':
 *         description: Document not found
 *       '500':
 *         description: Server error
 */
router.delete("/:documentId", deleteDocument);

/**
 * @swagger
 * /documents/{documentId}/approver/comment:
 *   post:
 *     summary: Submit feedback from approver
 *     tags: [Document]
 *     parameters:
 *       - in: path
 *         name: documentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the document
 *     requestBody:
 *       description: Feedback data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 required: true
 *             example:
 *               comment: This document requires revision.
 *     responses:
 *       200:
 *         description: Success message
 *
 * /documents/send/{documentId}:
 *   post:
 *     summary: Send document to approver
 *     tags: [Document]
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
 */
router.post("/:documentId/approver/comment", submitFeedbackFromApprover);


/**
* @swagger
* /documents/{documentId}:
*   post:
*     summary: Publish a document
*     tags: [Document]
*     parameters:
*       - name: documentId
*         in: path
*         description: ID of the document to publish
*         required: true
*         schema:
*           type: string
*     responses:
*       '200':
*         description: Document updated successfully
*       '404':
*         description: Document not found
*       '500':
*         description: Server error
*/
// it will publish the document to home
router.post("/publish/:id", publishDocument);
/**
 * @swagger
 * /documents/{documentId}/approver/comment:
 *   post:
 *     summary: Submit feedback from approver
 *     tags: [Document]
 *     parameters:
 *       - in: path
 *         name: documentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the document
 *     requestBody:
 *       description: Feedback data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 required: true
 *             example:
 *               comment: This document requires revision.
 *     responses:
 *       200:
 *         description: Success message
 *
 * /documents/approver/{approveId}:
 *   get:
 *     summary: Get all documents of approver
 *     tags: [Document]
 *     parameters:
 *       - in: path
 *         name: approveId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the approver
 *     responses:
 *       200:
 *         description: List of documents
 */

router.post("/:documentId/approver/comment", submitFeedbackFromApprover);


router.get("/approver/:approveId", getAllDocumentsOfApprover);


/**
 * @swagger
 * /documents/:documentId/assign:
 *   post:
 *     summary: Assign a document to an user
 *     tags: [Document]
 *     parameters:
 *       - in: path
 *         name: documentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the document
 *     requestBody:
 *       description: Feedback data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: ObjectID
 *                 required: true
 *             example:
 *               comment: userid
 *     responses:
 *       200:
 *         description: Success message
 *
 * */
router.post("/:documentId/assign", assignDocumentToApprover);

router.post("/:documentId/approve", approveADocument);


module.exports = router;