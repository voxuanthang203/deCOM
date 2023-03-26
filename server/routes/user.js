const express = require("express");
const router = express.Router();
const { create } = require("../model/controller/user.controller.js");

router.post("/create", create);

module.exports = router;
