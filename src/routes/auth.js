// Import dependencies
const express = require("express");

// Middleware
const authController = require("../controller/AuthController");
// const Middleware = require("../middleware/firebase_auth");

const router = express.Router();

router.post("/login", authController.login);

router.post("/register", authController.register);

module.exports = router;
