const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const authRouter = require('./auth');
const userRouter = require('./user');
const opinionRouter = require('./opinion');
const documentRouter = require('./document');
const departmentRouter = require('./department');
const logRouter = require('./log');


router.use("/auth", authRouter);
router.use("/users", verifyToken, userRouter);
router.use("/opinions", verifyToken, opinionRouter);
router.use("/documents", verifyToken, documentRouter);
router.use("/departments", verifyToken, departmentRouter);
router.use("/logs", verifyToken, logRouter);

module.exports = router;