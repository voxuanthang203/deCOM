const express = require("express");
const router = express.Router();

// Get the user information
router.get("/info", auth, (req, res) => {});

module.exports = router;
