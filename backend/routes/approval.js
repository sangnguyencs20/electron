const express = require("express");
const router = express.Router();

const { getApprovalsOfADocument } = require("../controllers/approvalController");

router.get("/:documentId", getApprovalsOfADocument);  



module.exports = router;