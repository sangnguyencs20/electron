const express = require("express");
const router = express.Router();

const { getOpinionsOfADocument, createOpinion } = require("../controllers/opinionController");

router.get("/:documentId", getOpinionsOfADocument);
router.post("/", createOpinion);

module.exports = router;