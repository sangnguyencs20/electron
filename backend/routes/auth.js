const express = require("express");
const router = express.Router();
const { login, signup, logout } = require("../controllers/auth");
const verifyToken = require('../middleware/auth');

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", verifyToken, logout);

module.exports = router;