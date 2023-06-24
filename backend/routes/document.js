const express = require("express");
const router = express.Router();

const {
    getDocuments,
    createDocument,
    getDocumentById,
    getDocumentOfUser,
    updateDocumentApproval,
    updateDocument
}
    = require("../controllers/documentController");

router.get("/", getDocuments);
router.post("/", createDocument);
router.get("/:id", getDocumentById);
router.get("/:userId", getDocumentOfUser);
router.post("/approval/:id", updateDocumentApproval);
router.post(":id", updateDocument);

module.exports = router;