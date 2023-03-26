const express = require("express");
const router = express.Router();
const {
  create,
  remove,
  get,
} = require("../model/controller/transaction.controller.js");
const { auth } = require("../middlewares/shippingAuth");

// Get the all transactions
router.get("/all", auth, get);

// Remove a transaction
router.delete("/:id", auth, remove);

// Create a new transaction
router.post("/create", create);

module.exports = router;
