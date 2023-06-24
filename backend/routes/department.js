const express = require("express");
const router = express.Router();

const {
    getDepartments,
    createDepartment,
} 
= require("../controllers/departmentController");

router.get("/", getDepartments);
router.post("/", createDepartment);

module.exports = router;